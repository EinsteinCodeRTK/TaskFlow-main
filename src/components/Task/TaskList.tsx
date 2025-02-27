import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, DropResult, DragStart } from '@hello-pangea/dnd';
import { useAuth } from '../../contexts/AuthContext';
import { getTasks, deleteTask, createTask, updateTask } from '../../firebase';
import { Task } from '../../types/types';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import CommentModal from './CommentModal';
import './_task.scss';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [dragError, setDragError] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [commentingTask, setCommentingTask] = useState<Task | undefined>();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [isDndReady, setIsDndReady] = useState(false);
  
  const { currentUser } = useAuth();

  useEffect(() => {
    // Pievienojam nelielu aizkavi, lai ļautu React pabeigt renderēšanu
    const timer = setTimeout(() => {
      setIsDndReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const fetchTasks = useCallback(async () => {
    if (!currentUser) {
      console.log('No current user, skipping task fetch');
      return;
    }
    
    try {
      setLoading(true);
      console.log('Fetching tasks for user:', currentUser.uid);
      const fetchedTasks = await getTasks(currentUser.uid);
      
      // Pārbaudām, vai katram uzdevumam ir derīgs ID
      const validTasks = fetchedTasks.filter(task => {
        if (!task.id) {
          console.error('Task without ID found:', task);
          return false;
        }
        return true;
      });

      console.log('Valid tasks:', validTasks);
      setTasks(validTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Neizdevās ielādēt uzdevumus');
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    console.log('TaskList mounted, fetching tasks...');
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    console.log('Current user in TaskList:', currentUser);
  }, [currentUser]);

  const handleDragEnd = async (result: DropResult) => {
    setDragError('');
    const { destination, source, draggableId } = result;

    // Detalizēta reģistrēšana drag and drop darbībām
    console.log('Drag end:', {
      draggableId,
      source,
      destination,
      availableTaskIds: tasks.map(t => t.id)
    });

    if (!destination) {
      setDragError('Uzdevums netika nomests derīgā vietā');
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = tasks.find(t => t.id === draggableId);
    if (!task) {
      setDragError(`Neizdevās atrast uzdevumu ar ID: ${draggableId}. Lūdzu, atsvaidziniet lapu.`);
      console.error('Task not found:', {
        draggableId,
        availableTasks: tasks
      });
      return;
    }

    const newStatus = destination.droppableId as Task['status'];
    
    try {
      // Optimistiski atjauninām UI
      const updatedTasks = tasks.map(t => 
        t.id === draggableId ? { ...t, status: newStatus } : t
      );
      setTasks(updatedTasks);

      // Tad atjauninām serveri
      await updateTask(draggableId, {
        ...task,
        status: newStatus
      });
      
      // Pārlādējam uzdevumus, lai pārliecinātos par sinhronizāciju
      await fetchTasks();
      
      setDragError('success:Uzdevuma statuss veiksmīgi atjaunināts');
      setTimeout(() => setDragError(''), 3000);
    } catch (error) {
      console.error('Error updating task status:', error);
      // Atjaunojam sākotnējo stāvokli kļūdas gadījumā
      await fetchTasks();
      setDragError(`Neizdevās atjaunināt uzdevuma statusu: ${error instanceof Error ? error.message : 'Nezināma kļūda'}`);
    }
  };

  const handleDragStart = () => {
    setDragError('');
  };

  const getTasksByStatus = (status: Task['status']) => {
    // Pārbaudām, vai visi uzdevumi šajā statusā ir ar derīgiem ID
    const tasksInStatus = tasks.filter(task => {
      if (task.status === status && !task.id) {
        console.error('Task without ID in status', status, ':', task);
        return false;
      }
      return task.status === status;
    });
    
    console.log(`Tasks in ${status}:`, tasksInStatus);
    return tasksInStatus;
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Neizdevās dzēst uzdevumu');
    }
  };

  const handleComment = (task: Task) => {
    setCommentingTask(task);
    setShowCommentModal(true);
  };

  const handleSubmit = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      if (!currentUser) {
        console.error('No authenticated user found');
        setError('Lietotājs nav autentificēts');
        return;
      }

      console.log('TaskList: Submitting task data:', {
        ...taskData,
        currentUser: currentUser.uid
      });
      
      if (editingTask?.id) {
        console.log('TaskList: Updating existing task:', editingTask.id);
        await updateTask(editingTask.id, taskData);
      } else {
        console.log('TaskList: Creating new task');
        const newTaskId = await createTask({
          ...taskData,
          assignedTo: [currentUser.uid],
          createdBy: currentUser.uid
        });
        console.log('TaskList: New task created with ID:', newTaskId);
        
        // Pagaidām pievienojam jauno uzdevumu lokāli, lai izvairītos no papildu servera pieprasījuma
        setTasks(prevTasks => [...prevTasks, {
          ...taskData,
          id: newTaskId,
          assignedTo: [currentUser.uid],
          createdBy: currentUser.uid,
          createdAt: new Date()
        }]);
      }
      
      setShowForm(false);
      setEditingTask(undefined);
      console.log('TaskList: Refreshing task list...');
      
      // Pārlādējam uzdevumus, lai pārliecinātos par sinhronizāciju
      await fetchTasks();
    } catch (error) {
      console.error('TaskList: Error saving task:', error);
      setError('Neizdevās saglabāt uzdevumu');
      throw error;
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };

  if (loading && tasks.length === 0) {
    return <div className="task-list-loading">Ielādē uzdevumus...</div>;
  }

  if (error) {
    return <div className="task-list-error">{error}</div>;
  }

  if (!isDndReady) {
    return <div className="task-list-loading">Inicializē drag and drop...</div>;
  }

  const statusColumns: Task['status'][] = ['TODO', 'IN_PROGRESS', 'DONE'];

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Mani Uzdevumi</h2>
        <button 
          className="add-task-button"
          onClick={() => setShowForm(true)}
        >
          Pievienot jaunu uzdevumu
        </button>
      </div>
      
      {dragError && (
        <div 
          className={`drag-error-message ${dragError.startsWith('success:') ? 'success' : 'error'}`}
          role="alert"
        >
          {dragError.replace('success:', '')}
        </div>
      )}
      
      <DragDropContext 
        onDragEnd={handleDragEnd} 
        onDragStart={handleDragStart}
        onBeforeDragStart={(initial: DragStart) => {
          console.log('Before drag start:', {
            draggableId: initial.draggableId,
            availableTaskIds: tasks.map(t => t.id)
          });
        }}
      >
        <div className="task-columns">
          {statusColumns.map((status) => (
            <div key={status} className="task-column">
              <h3 className="column-header">{status.replace('_', ' ')}</h3>
              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                    data-status={status}
                  >
                    {getTasksByStatus(status).map((task, index) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        index={index}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onComment={handleComment}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      {showCommentModal && commentingTask && (
        <CommentModal
          task={commentingTask}
          open={showCommentModal}
          setOpen={setShowCommentModal}
          onCommentAdded={fetchTasks}
        />
      )}
    </div>
  );
};

export default TaskList; 