'use client';

import ListPredictions from "@/components/listPredictions";
import PageTitle from "@/components/PageTitle/PageTitle";
import { API } from "@/config/api";
import { Prediction } from "@/interfaces/Prediction";
import { useAuth } from "@/providers/AuthProvider";
import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const PredictHistory: NextPage = () => {
    const auth = useAuth();

    const [predictions, setPredictions] = useState([] as Prediction[]);

    useEffect(() => {
        if (!auth.authenticated) return;

        axios.get(API.OTHERS.listPredictions, { withCredentials: true })
            .then(res => {
                const predictions = res.data as Prediction[];
                setPredictions(predictions);
            })
            .catch(e => {
                console.log(e);
            });
    }, [auth]);

    return (
        <>
            <PageTitle title={"Predict History"} />
            <ListPredictions predictions={predictions} />
        </>
    );
};

export default PredictHistory;
