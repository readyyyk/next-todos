import NextAuth from 'next-auth';
import options from './options';

// eslint-disable-next-line new-cap
const handler: unknown = NextAuth(options);

export {handler as GET, handler as POST};

