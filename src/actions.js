import { HttpError } from 'wasp/server'

export const createTask = async ({ title, description, location }, context) => {
  if (!context.user) { throw new HttpError(401) };
  if (context.user.userType !== 'NGO') { throw new HttpError(403) };

  const newTask = await context.entities.Task.create({
    data: {
      title,
      description,
      location,
      ngo: { connect: { id: context.user.id } }
    }
  });
  return newTask;
}

export const verifySubmission = async ({ submissionId, approvalStatus }, context) => {
  if (!context.user) { throw new HttpError(401) }; // Ensure user is authenticated.

  const submission = await context.entities.Submission.findUnique({
    where: { id: submissionId },
    include: { task: true }
  });

  if (!submission) { throw new HttpError(404, 'Submission not found') };
  if (submission.task.ngoId !== context.user.id) {
    throw new HttpError(403); // Ensure only the respective NGO can verify the submission.
  }

  return context.entities.Submission.update({
    where: { id: submissionId },
    data: { isApproved: approvalStatus }
  });
}

export const claimReward = async ({ rewardId }, context) => {
  if (!context.user) { throw new HttpError(401) };
  
  // Retrieve the reward details
  const reward = await context.entities.Reward.findUnique({
    where: { id: rewardId }
  });
  
  if (!reward) { throw new HttpError(404, 'Reward not found') };
  
  // Check if the reward is still valid
  const now = new Date();
  if (reward.validUntil < now) { throw new HttpError(400, 'Reward is no longer valid') };
  
  // Check if the user is eligible to claim the reward
  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    include: { rewards: true }
  });
  
  const hasAlreadyClaimed = user.rewards.some(ur => ur.id === rewardId);
  if (hasAlreadyClaimed) { throw new HttpError(400, 'Reward already claimed') };
  
  // Allow the user to claim the reward
  await context.entities.Reward.update({
    where: { id: rewardId },
    data: { userId: user.id }
  });
  
  // Return the claimed reward
  return reward;
}
