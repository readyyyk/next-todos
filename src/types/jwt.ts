import {z} from 'zod';

export const jwtPayloadSchema = z.object({
    subject: z.object({
        id: z.number(),
    }),
    type: z.enum(['access', 'refresh']),
    exp: z.number(),
    iat: z.number(),
    jti: z.string().uuid(),
});

export const loginResultSuccessSchema = z.object({
    access_token: z.string(),
    refresh_token: z.string(),
});
interface loginResultSuccess {
    data: z.infer<typeof loginResultSuccessSchema>,
    success: true,
}

export const loginResultErrorSchema = z.object({
    data: z.object({
        detail: z.string(),
    }),
});
interface loginResultError extends z.infer<typeof loginResultErrorSchema> {
    success: false,
}

export type {loginResultError, loginResultSuccess};
