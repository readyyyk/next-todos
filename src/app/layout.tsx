import type {Metadata} from 'next';
import {Roboto as roboto} from 'next/font/google';
import './globals.css';
import {FC, ReactNode} from 'react';
import {ThemeProvider} from '@/components/theme-provider';
import Header from '@/components/Header';
import TSQueryProvider from '@/components/TQuery.provider';
import AuthProvider from '@/components/Auth.provider';


const font = roboto({subsets: ['latin', 'cyrillic'], weight: '400'});

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
    title: 'Todos',
    description: 'Test Next js todo list application',
};


const RootLayout:FC<{children: ReactNode}> = ({children}) => {
    return (
        <html lang="en">
            <body className={'min-h-screen '+font.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TSQueryProvider>
                        <AuthProvider>
                            <Header />
                            {children}
                        </AuthProvider>
                    </TSQueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
