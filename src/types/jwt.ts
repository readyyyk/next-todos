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

export const tokensSchema = z.object({
    access_token: z.string(),
    refresh_token: z.string(),
});

export type ITokens = z.infer<typeof tokensSchema>;
