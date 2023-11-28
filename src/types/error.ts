import {z} from 'zod';

export const errorSchema = z.object({
    detail: z.string(),
});

export type IErrorSchema = z.infer<typeof errorSchema>;
