'use server';

import {revalidatePath} from 'next/cache';

export const serverRevalidatePath = (originalPath: string, type?: 'layout' | 'page') => {
    return revalidatePath(originalPath, type);
};
