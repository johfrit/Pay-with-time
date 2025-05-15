import React from 'react';
import { Link } from 'wasp/client/router';
import { useQuery } from 'wasp/client/operations';
import { getNearbyTasks } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: tasks, isLoading, error } = useQuery(getNearbyTasks, { location: 'currentLocation' });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      <div className='grid gap-4'>
        {tasks.map(task => (
          <div key={task.id} className='p-4 bg-gray-100 rounded-lg'>
            <h2 className='text-xl font-semibold'>{task.title}</h2>
            <p className='text-gray-700'>{task.description}</p>
            <p className='text-gray-500'>{task.location}</p>
            <p className='text-sm text-green-500'>{task.isCompleted ? 'Completed' : 'In Progress'}</p>
            <Link to={`/task/${task.id}`} className='text-blue-500 hover:underline'>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
