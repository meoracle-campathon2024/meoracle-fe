'use client';

import PageTitle from "@/components/PageTitle/PageTitle"
import { API } from "@/config/api";
import { Prediction } from "@/interfaces/Prediction";
import { Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import axios from "axios";
import classNames from "classnames";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import useSWR from "swr";
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import { Symtom } from "@/interfaces/Symtom";
import { Disease } from "@/interfaces/Disease";
import Image from "next/image";
import ListDieases from "@/components/listDiseases";
import { useAuth } from "@/providers/AuthProvider";
import { PATH } from "@/config/path";

const Detail = (prediction: Prediction) => {
    if (prediction.model_name == "classification") {
        return (
            <div className="flex flex-wrap gap-2">
                {prediction.selected_symptoms.map((symptom, key) => (
                    <span key={key} className={classNames("rounded-lg p-2 border-2 mr-2")}>
                        {symptom.name}
                    </span>
                ))}
            </div>
        )
    }
    if (prediction.model_name == "nlp") {
        return <div className="border-2 rounded-lg p-2">{prediction.query_content}</div>
    }

    if (prediction.model_name == "image") {
        return (
            <div className="flex flex-wrap gap-2">
                {prediction.uploaded_images.map((img, key) =>
                    <Image key={key} className="rounded-lg" src={img.file_path} alt="" width={100} height={100}/>
                )}
            </div>
        )
    }
}

const PredictionDetail = () => {
    const router = useRouter();
    const auth = useAuth();
    const params = useParams()
    const [prediction, setPrediction] = useState<Prediction|null>(null)
    const [predictionNotFound, setPredictionNotFound] = useState(false);

    useEffect(() => {
        if (!auth.authenticated) return;

        axios.get(API.OTHERS.listPredictions, { withCredentials: true })
            .then(res => {
                const predictions = res.data as Prediction[];
                setPrediction(predictions.filter(p => p.id === +params.id)[0])
            })
            .catch(e => {
                setPredictionNotFound(true);
                console.log(e);
            });
    }, [auth, params]);

    return (
        null === prediction
        ? (
            predictionNotFound
            ? <>
                <PageTitle title="Prediction Not Found" />
            </>
            : <></>
        )
        : <div className="flex flex-col gap-3">
            <PageTitle title={`Prediction Detail ${params?.id}`} />
            <p><b>Created at:</b> {" "} {new Date(prediction?.created_at).toLocaleString()}</p>
            <p><b>Predicted by:</b> {prediction.model_name}</p>
            <p><b>Detail:</b></p>
            {Detail(prediction)}
            <p className="mt-5 font-bold">Predict Result:</p>

            <ListDieases dieases={prediction.results} queryDetail={prediction} />
            {/* <List>
                {prediction.results.map((disease, key) => (
                    <ListItem key={key} disablePadding className={"hover:bg-gray-200 p-2"}>
                        <ListItemIcon>
                            <CoronavirusIcon />
                        </ListItemIcon>
                        <ListItemText primary={disease.disease_name} />
                    </ListItem>
                ))}
            </List> */}

            <Button onClick={() => router.push(PATH.PREDICT_HISTORY)}>
                {"View entire prediction history"}
            </Button>
        </div>
    )
}

export default PredictionDetail
