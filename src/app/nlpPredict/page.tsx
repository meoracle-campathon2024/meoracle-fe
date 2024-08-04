'use client';

import React from "react";
import ListDieases from "@/components/listDiseases";
import PageTitle from "@/components/PageTitle/PageTitle";
import PredictButton from "@/components/PredictButton";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import type { NextPage } from "next";
import { Disease } from "@/interfaces/Disease";
import { nlpPredict } from "@/utils/backend";

const Home: NextPage = () => {
    const [dieases, setDieases] = React.useState<Disease[]>([]);
    const [query, setQuery] = React.useState<string>("");
    const [alertQueryIsEmpty, setAlertQueryIsEmpty] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);

    const predict = async () => {
        setDieases([])

        if (!query.trim()) {
            setAlertQueryIsEmpty(true)
            return
        }
        setAlertQueryIsEmpty(false)

        const result = await nlpPredict(query)
        setDieases(result)
    }

    return (
        <>
            <PageTitle title={"NLP PREDICT"} />
            <div>
                <TextField fullWidth multiline rows={4} id="outlined-basic" label="Describe your symtoms" variant="outlined"
                    className="max-w-[500px]"
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <PredictButton onClick={predict} />
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

export default Home;
