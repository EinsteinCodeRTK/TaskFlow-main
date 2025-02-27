import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from '../../types/types';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';
import commentIcon from '../../assets/comment.svg';
import './_task.scss';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onComment?: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit, onDelete, onComment }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  if (!task.id) {
    console.error('Task without ID detected:', task);
    return null;
  }

  if (typeof task.id !== 'string' || task.id.trim() === '') {
    console.error('Invalid task ID detected:', {
      id: task.id,
      type: typeof task.id,
      task
    });
    return null;
  }

  console.log('Rendering TaskCard:', {
    id: task.id,
    index,
    status: task.status
  });

  const handleDelete = () => {
    if (showConfirmDelete && onDelete && task.id) {
      onDelete(task.id);
      setShowConfirmDelete(false);
    } else {
      setShowConfirmDelete(true);
      setTimeout(() => setShowConfirmDelete(false), 3000);
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        console.log('Draggable render:', {
          id: task.id,
          isDragging: snapshot.isDragging,
          hasDropAnimation: snapshot.isDropAnimating,
          draggableProps: provided.draggableProps
        });

        return (
          <div
            className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="task-header">
              <h3>{task.title}</h3>
              <div className="task-actions">
                {onEdit && (
                  <button 
                    className="task-action-button"
                    onClick={() => onEdit(task)}
                    title="Rediģēt uzdevumu"
                  >
                    <img src={editIcon} alt="Rediģēt" width="20" height="20" />
                  </button>
                )}
                {onComment && (
                  <button 
                    className="task-action-button"
                    onClick={() => onComment(task)}
                    title="Pievienot komentāru"
                  >
                    <img src={commentIcon} alt="Komentēt" width="20" height="20" />
                    {task.comments && task.comments.length > 0 && (
                      <span className="comment-count">{task.comments.length}</span>
                    )}
                  </button>
                )}
                {onDelete && task.id && (
                  <button 
                    className={`task-action-button ${showConfirmDelete ? 'confirm-delete' : ''}`}
                    onClick={handleDelete}
                    title={showConfirmDelete ? "Nospiediet vēlreiz, lai dzēstu" : "Dzēst uzdevumu"}
                  >
                    <img src={deleteIcon} alt="Dzēst" width="20" height="20" />
                  </button>
                )}
              </div>
            </div>

            <p className="task-description">{task.description}</p>
            
            <div className="task-meta">
              <span className={`task-priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              <span className={`task-status ${task.status.toLowerCase()}`}>
                {task.status}
              </span>
            </div>

            <div className="task-footer">
              <div className="task-due-date">
                <span>Termiņš:</span>
                <span>{new Date(task.dueDate).toLocaleDateString('lv-LV')}</span>
                <span>{task.time}</span>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskCard; 