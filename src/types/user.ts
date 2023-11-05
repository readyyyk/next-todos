import {z} from 'zod';


export const UserScheme = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    image: z.string().url(),
});

type User = z.infer<typeof UserScheme>;

export default User;
