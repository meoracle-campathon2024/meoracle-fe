'use client';

import ListPredictions from "@/components/listPredictions";
import PageTitle from "@/components/PageTitle/PageTitle";
import { useAuth } from "@/providers/AuthProvider";
import type { NextPage } from "next";

const PredictHistory: NextPage = () => {
    const auth = useAuth();

    return (
        <>
            <div>{!auth.authenticated ? "BẠN CHƯA ĐĂNG NHẬP" : (
                <div>
                    <p>BẠN ĐÃ ĐĂNG NHẬP !</p>
                    <p>ID = {auth.id}</p>
                </div>
            )}</div>
            <PageTitle title={"Predict History"} />
            <ListPredictions />
        </>
    );
};

export default PredictHistory;
