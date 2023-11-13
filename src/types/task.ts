import {z} from 'zod';
import {UserScheme} from '@/types/user';


export const TaskScheme = z.object({
    id: z.number(),
    owner_id: z.number(),
    description: z.string(),
    state: z.string(), // TODO Enum
    created_at: z.string(),
});

export const TaskWithOwnerScheme = TaskScheme.extend({
    owner: UserScheme,
});

export const TaskListScheme = z.array(TaskScheme);

type ITask = z.infer<typeof TaskScheme>;

export default ITask;
