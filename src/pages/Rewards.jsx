import React from 'react';
import { useQuery, useAction } from 'wasp/client/operations';
import { getRewards, claimReward } from 'wasp/client/operations';

const RewardsPage = () => {
  const { data: rewards, isLoading, error } = useQuery(getRewards);
  const claimRewardFn = useAction(claimReward);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleClaimReward = (rewardId) => {
    claimRewardFn({ rewardId });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Your Rewards</h1>
      {rewards.length === 0 ? (
        <p>No rewards available at the moment.</p>
      ) : (
        <div className='grid gap-4'>
          {rewards.map((reward) => (
            <div key={reward.id} className='flex items-center justify-between bg-white p-4 shadow-md rounded-lg'>
              <div>{reward.description}</div>
              <button
                onClick={() => handleClaimReward(reward.id)}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                Claim
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RewardsPage;
