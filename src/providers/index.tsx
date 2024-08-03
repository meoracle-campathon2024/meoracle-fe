'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthProvider } from './AuthProvider';

const theme = createTheme();

export function AllProviders({ children }: {
    children: React.ReactNode,
}) {
    return (
        <ThemeProvider theme={theme}>
            <AppRouterCacheProvider>
                {children}
            </AppRouterCacheProvider>
        </ThemeProvider>
    );
}
