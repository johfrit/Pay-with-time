import React from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getSubmissions, verifySubmission } from 'wasp/client/operations';

const AdminVerificationPage = () => {
  const { data: submissions, isLoading, error } = useQuery(getSubmissions);
  const verifySubmissionFn = useAction(verifySubmission);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleApproval = (submissionId, approvalStatus) => {
    verifySubmissionFn({ submissionId, approvalStatus });
  };

  return (
    <div className='p-4'>
      {submissions.map((submission) => (
        <div key={submission.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <img src={submission.photoUrl} alt='Submission' className='w-full h-auto mb-4' />
          <div className='flex justify-end gap-x-4'>
            <button
              onClick={() => handleApproval(submission.id, true)}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >
              Approve
            </button>
            <button
              onClick={() => handleApproval(submission.id, false)}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminVerificationPage;
