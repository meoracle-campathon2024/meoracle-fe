'use client';

import ListPredictions from "@/components/listPredictions";
import PageTitle from "@/components/PageTitle/PageTitle";
import { API } from "@/config/api";
import { Prediction } from "@/interfaces/Prediction";
import axios from "axios";
import type { NextPage } from "next";
import useSWR from "swr";

const PredictHistory: NextPage = () => {
    const { data: predictions, error: errorGetPredictions, isLoading } = useSWR<Prediction[], Error>(
        API.OTHERS.listPredictions,
        async (url: string) => {
            const res = await axios.get(url, {withCredentials: true});
            return res.data.reverse();
        }
    );

    return (
        <>
            <PageTitle title={"Predict History"} />
            <ListPredictions predictions={predictions || []} />
        </>
    );
};

export default PredictHistory;
