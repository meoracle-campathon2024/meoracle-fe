'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthProvider } from './AuthProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import 'dayjs';
import 'dayjs/locale/en-gb';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const theme = createTheme();

export function AllProviders({ children }: {
    children: React.ReactNode,
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <ThemeProvider theme={theme}>
                <AppRouterCacheProvider>
                    {children}
                </AppRouterCacheProvider>
            </ThemeProvider>
        </LocalizationProvider>
    );
}
