import {SafeParseReturnType, z} from 'zod';
import {UserScheme} from '@/types/user';


export const TaskScheme = z.object({
    id: z.number(),
    owner_id: z.number(),
    description: z.string(),
    state: z.string(), // TODO Enum
    created_at: z.string(),
});

export const TaskWithOwnerScheme = TaskScheme.extend({owner: UserScheme});
export type ITaskWithOwnerScheme = z.infer<typeof TaskWithOwnerScheme>;
export type ITaskWithOwnerSafeResult =
    SafeParseReturnType<ITaskWithOwnerScheme, ITaskWithOwnerScheme>;


export const TaskListScheme = z.array(TaskScheme);
export type ITaskListScheme = z.infer<typeof TaskListScheme>;
export type ITaskListSafeResult =
    SafeParseReturnType<ITaskListScheme, ITaskListScheme>;

type ITask = z.infer<typeof TaskScheme>;

export default ITask;
