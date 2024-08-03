'use client';

import ListPredictions from "@/components/listPredictions";
import PageTitle from "@/components/PageTitle/PageTitle";
import type { NextPage } from "next";

const PredictHistory: NextPage = () => {
    return (
        <>
            <PageTitle title={"Predict History"} />
            <ListPredictions />
        </>
    );
};

export default PredictHistory;
