import React from 'react';
import './_tasks.scss';
import TaskList from '../../components/Task/TaskList';

const Tasks: React.FC = () => {
  return (
    <div className='tasks'>
      <TaskList />
    </div>
  );
};

export default Tasks;