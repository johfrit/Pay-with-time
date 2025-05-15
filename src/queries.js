import { HttpError } from 'wasp/server'

export const getNearbyTasks = async ({ location }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const tasks = await context.entities.Task.findMany({
    where: {
      location: location, 
    },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      isCompleted: true
    }
  });

  return tasks;
}

export const getTaskDetails = async ({ taskId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const task = await context.entities.Task.findUnique({
    where: { id: taskId },
    include: {
      ngo: {
        select: {
          id: true,
          userType: true
        }
      },
      submissions: {
        select: {
          id: true,
          photoUrl: true,
          isApproved: true,
          volunteer: {
            select: {
              id: true
            }
          }
        }
      }
    }
  });

  if (!task) throw new HttpError(404, 'Task not found');
  return task;
}

export const getRewards = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Reward.findMany({
    where: {
      userId: context.user.id,
      validUntil: {
        gt: new Date()
      }
    }
  })
}

export const getSubmissions = async ({ taskId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const submissions = await context.entities.Submission.findMany({
    where: { taskId: taskId },
    select: {
      id: true,
      photoUrl: true,
      isApproved: true,
      task: {
        select: {
          id: true,
          title: true
        }
      },
      volunteer: {
        select: {
          id: true,
          userType: true
        }
      }
    }
  });

  return submissions;
}
