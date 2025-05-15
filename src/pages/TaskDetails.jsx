import React from 'react';
import { useParams } from 'wasp/client/router';
import { useQuery, useAction } from 'wasp/client/operations';
import { getTaskDetails, verifySubmission } from 'wasp/client/operations';

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const { data: task, isLoading, error } = useQuery(getTaskDetails, { taskId });
  const verifySubmissionFn = useAction(verifySubmission);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleVerifySubmission = (submissionId, approvalStatus) => {
    verifySubmissionFn({ submissionId, approvalStatus });
  };

  return (
    <div className='p-4 bg-white shadow-md rounded-lg'>
      <h1 className='text-2xl font-bold mb-4'>{task.title}</h1>
      <p className='text-lg'>{task.description}</p>
      <p className='text-gray-600'>Location: {task.location}</p>
      <h2 className='mt-6 text-xl font-semibold'>Submissions</h2>
      <div>
        {task.submissions.map((submission) => (
          <div key={submission.id} className='p-4 my-2 border rounded-lg'>
            <img src={submission.photoUrl} alt='Submission' className='w-full h-40 object-cover rounded mb-2' />
            <div className='flex justify-between items-center'>
              <p>Status: {submission.isApproved ? 'Approved' : 'Pending'}</p>
              <div>
                <button
                  onClick={() => handleVerifySubmission(submission.id, true)}
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded mr-2'
                  disabled={submission.isApproved}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleVerifySubmission(submission.id, false)}
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded'
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDetailsPage;
