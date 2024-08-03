'use client';

import React from "react";
import ListDieases from "@/components/listDiseases";
import PageTitle from "@/components/PageTitle/PageTitle";
import PredictButton from "@/components/PredictButton";
import { Button, TextField } from "@mui/material";
import type { NextPage } from "next";
import { Disease } from "@/interfaces/Disease";
import { nlpPredict } from "@/utils/backend";

const Home: NextPage = () => {
    const [dieases, setDieases] = React.useState<Disease[]>([]);

    const predict = async () => {
        const result = await nlpPredict()
        setDieases(result)
    }

    return (
        <>
            <PageTitle title={"NLP PREDICT"} />
            <div>
                <TextField fullWidth multiline rows={4} id="outlined-basic" label="Describe your symtoms" variant="outlined"
                className="max-w-[500px]"
                />
            </div>
            <PredictButton onClick={predict} />
            <ListDieases dieases={dieases}/>
        </>
    );
};

export default Home;
