'use client';

import React, { useCallback } from "react";
import ListDieases from "@/components/listDiseases";
import PageTitle from "@/components/PageTitle/PageTitle";
import PredictButton from "@/components/PredictButton";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import type { NextPage } from "next";
import { Disease } from "@/interfaces/Disease";
import { nlpPredict } from "@/utils/backend";
import Image from "next/image";
import { useAuth } from "@/providers/AuthProvider";

const NlpPredict: NextPage = () => {
    const auth = useAuth();
    const [dieases, setDieases] = React.useState<Disease[]>([]);
    const [query, setQuery] = React.useState<string>("");
    const [alertQueryIsEmpty, setAlertQueryIsEmpty] = React.useState<boolean>(false);
    const [predicting, setPredicting] = React.useState<boolean>(false);

    const predict = useCallback(async () => {
        setDieases([])
        setPredicting(true)

        try {
            if (!query.trim()) {
                setAlertQueryIsEmpty(true)
                setPredicting(false)
                return
            }
            setAlertQueryIsEmpty(false)

            const result = await nlpPredict(query)
            setDieases(result)
        } finally {
            setPredicting(false)
        }
    }, [setDieases, setPredicting, setAlertQueryIsEmpty]);

    return (
        <>
            <PageTitle title={"NLP PREDICT"} />
            <div className="flex items-center max-w-[500px]">
                <Image
                    src="/nlpPredict.png"
                    width={250}
                    height={250}
                    className="mb-2 max-w-[100px]"
                    alt=""
                />
                <p>{"Describe your symptoms, and I'll try to predict what's ailing you!"}</p>
            </div>
            <div>
                <TextField fullWidth multiline rows={4} id="outlined-basic" label="Describe your symtoms" variant="outlined"
                    className="max-w-[500px]"
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <PredictButton onClick={predict} predicting={predicting} isHidden={!auth.authenticated} />
            <ListDieases dieases={dieases} />
            <Snackbar open={alertQueryIsEmpty} autoHideDuration={100} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}>
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Query is empty
                </Alert>
            </Snackbar >
        </>
    );
};

export default NlpPredict;