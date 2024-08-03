'use client';

import { API, BASE_API_URL } from "@/config/api";
import { createContext, useContext, useEffect, useState } from "react";

type Auth = {
    authenticated: false,
} | ({
    authenticated: true,
    id: number,
} & ({
    account_id: null,
} | {
    account_id: number,
        account: {
            // TODO
            name: string,
            email: string,
        },
}));

const AuthContext = createContext({ authenticated: false } as Auth);

export function AuthProvider({ csrfToken, children } : {
    csrfToken: string,
    children: React.ReactNode,
}) {
    const [auth, setAuth] = useState({ authenticated: false } as Auth);

    useEffect(() => {
        fetch(`${API.AUTH.anonymous}`, {
            method: 'GET',
            headers: {
                'x-csrf-token': csrfToken,
            },
            credentials: 'include',
        }).then(res => res.json().then(data => [res.status, data] as const).catch(e => [res.status, e] as const))
        .then(([status, data]) => {
            if (status === 200) {
                const { id, account_id } = data;

                if (account_id === null) {
                    setAuth({
                        authenticated: true,
                        id,
                        account_id,
                    });
                } else if (typeof account_id === 'number') {
                    const { name, email } = data.account;
                    setAuth({
                        authenticated: true,
                        id,
                        account_id,
                        account: { name, email },
                    });
                }
            }
        }).catch(e => { throw e; });
    }, []);

    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
