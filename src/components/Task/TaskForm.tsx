import React, { useState, useEffect } from 'react';
import { Task, TaskPriority, TaskStatus } from '../../types/types';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../Input/Input';
import Button from '../Button/Button';
import TimePicker from '../Dropdowns/Time/TimePicker';
import './_task.scss';

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState<TaskPriority>(task?.priority || 'MEDIUM');
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'TODO');
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  );
  const [time, setTime] = useState(task?.time || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('TaskForm: handleSubmit izsaukts');
    
    if (!currentUser) {
        console.error('TaskForm: Nav pieejams currentUser');
        setError('Lietotājs nav autentificēts');
        return;
    }

    // Validācija
    const validationErrors = [];
    if (!title.trim()) validationErrors.push('Nosaukums ir obligāts');
    if (!description.trim()) validationErrors.push('Apraksts ir obligāts');
    if (!dueDate) validationErrors.push('Datums ir obligāts');
    if (!time) validationErrors.push('Laiks ir obligāts');

    if (validationErrors.length > 0) {
        console.log('TaskForm: Validācijas kļūdas:', validationErrors);
        setError(validationErrors.join(', '));
        return;
    }

    try {
        setLoading(true);
        setError('');
        
        const taskData = {
            title: title.trim(),
            description: description.trim(),
            priority,
            status,
            dueDate: dueDate,
            time,
            assignedTo: task?.assignedTo || [currentUser.uid],
            createdBy: task?.createdBy || currentUser.uid,
            comments: task?.comments || []
        };
        
        console.log('TaskForm: Mēģina saglabāt uzdevumu ar datiem:', taskData);
        await onSubmit(taskData);
        console.log('TaskForm: Uzdevums veiksmīgi saglabāts');
        
        onCancel();
    } catch (error) {
        console.error('TaskForm: Kļūda saglabājot uzdevumu:', error);
        setError(error instanceof Error ? error.message : 'Neizdevās saglabāt uzdevumu');
        setLoading(false);
    }
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form">
        <h2>{task ? 'Rediģēt Uzdevumu' : 'Jauns Uzdevums'}</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
              hint="Nosaukums"
              inputValue={title}
              onInputValueChange={setTitle}
              type="text"
              field="input"
              state={error && !title.trim() ? "error" : ""}
              error={error && !title.trim() ? "Nosaukums ir obligāts" : ""}
              name="title"
              id="title"
            />
          </div>

          <div className="form-group">
            <Input
              hint="Apraksts"
              inputValue={description}
              onInputValueChange={setDescription}
              type="textarea"
              field="input"
              state={error && !description.trim() ? "error" : ""}
              error={error && !description.trim() ? "Apraksts ir obligāts" : ""}
              name="description"
              id="description"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Prioritāte</label>
              <select
                id="priority"
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="form-select"
              >
                <option value="LOW">Zema</option>
                <option value="MEDIUM">Vidēja</option>
                <option value="HIGH">Augsta</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Statuss</label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="form-select"
              >
                <option value="TODO">Jāizdara</option>
                <option value="IN_PROGRESS">Procesā</option>
                <option value="DONE">Pabeigts</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <Input
                hint="Datums"
                inputValue={dueDate}
                onInputValueChange={setDueDate}
                type="date"
                field="input"
                state={error && !dueDate ? "error" : ""}
                error={error && !dueDate ? "Datums ir obligāts" : ""}
                name="dueDate"
                id="dueDate"
              />
            </div>

            <div className="form-group">
              <TimePicker
                open={timePickerOpen}
                setOpen={setTimePickerOpen}
                onTimeSelect={(selectedTime) => {
                  console.log('Selected time:', selectedTime);
                  setTime(selectedTime);
                }}
                initialValue={time}
              />
              {error && !time && <div className="error-message">Laiks ir obligāts</div>}
            </div>
          </div>

          <div className="form-actions">
            <Button 
              text="Atcelt"
              normal={false}
              width="120px"
              status=""
              onClick={(e) => {
                e.preventDefault();
                console.log('Cancel clicked');
                onCancel();
              }}
            />
            <Button 
              text={loading ? "Saglabā..." : (task ? "Saglabāt" : "Create")}
              normal={true}
              width="120px"
              status={loading ? "disabled" : ""}
              onClick={(e) => {
                e.preventDefault();
                console.log('Create/Save clicked');
                handleSubmit(e);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm; 