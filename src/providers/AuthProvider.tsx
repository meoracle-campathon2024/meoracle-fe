'use client';

import { API, BASE_API_URL } from "@/config/api";
import { createContext, useContext, useEffect, useRef, useState } from "react";

export type Account = {
    // TODO
    name: string,
    email: string,
}

export type User = {
    id: number,
    account_id: null,
} | {
    id: number,
    account_id: number,
    account: Account,
};

export type Auth = {
    authenticated: false,
    error: string | null,
} | {
    authenticated: true,
    user: User,
};

const AuthContext = createContext({ authenticated: false, error: null } satisfies Auth as Auth);

export function AuthProvider({ csrfToken, children }: {
    csrfToken: Readonly<string>,
    children: React.ReactNode,
}) {
    const [auth, setAuth] = useState({ authenticated: false, error: null } satisfies Auth as Auth);

    const alreadyAuthenticated = useRef<boolean>(false);
    useEffect(() => {
        if (alreadyAuthenticated.current) {
            return;
        }

        fetch(`${API.AUTH.anonymous}`, {
            method: 'GET',
            headers: {
                'x-csrf-token': csrfToken,
            },
            credentials: 'include',
        })
            .then(async res => {
                const status = res.status;
                const data = await res.json();

                if (status === 200) {
                    const { id, account } = data;

                    if (account === null) {
                        setAuth({
                            authenticated: true,
                            user: {
                                id,
                                account_id: null,
                            },
                        });
                    } else if (typeof account === 'object') {
                        const { id, name, email } = data.account;
                        setAuth({
                            authenticated: true,
                            user: {
                                id,
                                account_id: id,
                                account: { name, email },
                            },
                        });
                    } else {
                        throw new Error("unknown account data");
                    }
                } else {
                    const e = data;
                    setAuth({
                        authenticated: false,
                        error: e?.message || ("" + e),
                    });
                }
            })
            .catch(e => {
                setAuth({
                    authenticated: false,
                    error: "" + e,
                });
            });

        return () => {
            alreadyAuthenticated.current = true;
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
