import {z} from 'zod';
import {tokensSchema} from '@/types/jwt';


const signInScheme = z.object({
    username: z.string().min(3, {message: 'Username must be atleast 3 characters'}),
    password: z.string().min(6, {message: 'Password must be atleast 6 characters'}),
});
export type SignIn = z.infer<typeof signInScheme>;
export default signInScheme;

interface signinResultSuccess {
    data: z.infer<typeof tokensSchema>,
    success: true,
}

export const signinResultErrorSchema = z.object({
    data: z.object({
        detail: z.string(),
    }),
});
interface signinResultError extends z.infer<typeof signinResultErrorSchema> {
    success: false,
}

export {
    type signinResultError,
    type signinResultSuccess,
};
