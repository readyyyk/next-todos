import {SafeParseReturnType, z} from 'zod';
import {UserScheme} from '@/types/user';


export enum TaskState {
    DONE = 'done',
    ACTIVE = 'active',
    PASSIVE = 'passive',
    IMPORTANT = 'important',
}
const taskStateSchema = z.nativeEnum(TaskState);

export const TaskScheme = z.object({
    id: z.number(),
    owner_id: z.number(),
    description: z.string().trim().min(1),
    state: taskStateSchema,
    created_at: z.string(),
});
export type ITaskScheme = z.infer<typeof TaskScheme>;
export type ITaskSchemeSafeResult =
    SafeParseReturnType<ITaskScheme, ITaskScheme>;

export const TaskUpdateScheme = z.object({
    // owner_id: z.number().optional(),
    description: z.string().trim().min(1).optional(),
    state: taskStateSchema.optional(),
});
export type ITaskUpdateScheme = z.infer<typeof TaskUpdateScheme>;
export type ITaskUpdateSchemeSafeResult =
    SafeParseReturnType<ITaskScheme, ITaskScheme>;

export const TaskCreateScheme = z.object({
    description: z.string().trim().min(1),
});
export type ITaskCreateScheme = z.infer<typeof TaskCreateScheme>;

export const TaskWithOwnerScheme = TaskScheme.extend({owner: UserScheme});
export type ITaskWithOwnerScheme = z.infer<typeof TaskWithOwnerScheme>;
export type ITaskWithOwnerSafeResult =
    SafeParseReturnType<ITaskWithOwnerScheme, ITaskWithOwnerScheme>;


export const TaskListScheme = z.array(TaskScheme);
export type ITaskListScheme = z.infer<typeof TaskListScheme>;
export type ITaskListSafeResult =
    SafeParseReturnType<ITaskListScheme, ITaskListScheme>;

export default ITaskScheme;
