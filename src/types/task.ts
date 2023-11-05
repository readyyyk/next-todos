import {z} from 'zod';


export const TaskScheme = z.object({
    id: z.number(),
    todo: z.string(),
    userId: z.number(),
    completed: z.boolean(),
});

export const TaskResScheme = z.object({
    todos: z.array(TaskScheme),
    skip: z.number(),
    total: z.number(),
    limit: z.number(),
});

type ITask = z.infer<typeof TaskScheme>;

export default ITask;
