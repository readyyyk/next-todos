import NextAuth from 'next-auth';
import options from './options';


// eslint-disable-next-line new-cap,@typescript-eslint/no-unsafe-assignment
const handler = NextAuth(options);

export {handler as GET, handler as POST};

