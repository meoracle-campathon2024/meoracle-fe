'use client';

import PageTitle from "@/components/PageTitle/PageTitle"
import { API } from "@/config/api";
import { Prediction } from "@/interfaces/Prediction";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import axios from "axios";
import classNames from "classnames";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import useSWR from "swr";
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import { Symtom } from "@/interfaces/Symtom";
import { Disease } from "@/interfaces/Disease";
import Image from "next/image";

const PredictionDetail = () => {
    const params = useParams()
    const [prediction, setPredction] = useState<Prediction>()
    const { data: predictions, error: errorGetPredictions, isLoading } = useSWR<Prediction[], Error>(
        API.OTHERS.listPredictions,
        async (url: string) => {
            const res = await axios.get(url, { withCredentials: true });
            return res.data;
        }
    );

    useEffect(() => {
        if (predictions) {
            setPredction(predictions.filter(p => p.id == params.id)[0])
        }
    }, [predictions])

    if (!prediction) {
        return
    }

    const Detail = (prediction: Prediction) => {
        if (prediction.model_name == "classification") {
            return (
                <div className="flex flex-wrap gap-2">
                    {prediction.selected_symptoms.map((index:number, symtom: Symtom) => (
                        <span key={index} className={classNames("rounded-lg p-2 border-2 mr-2")}>
                            {symtom.name}
                        </span>
                    ))}
                </div>
            )
        }
        if (prediction.model_name == "nlp") {
            return <div className="border-2 rounded-lg p-2">{prediction.query_content}</div>
        }

        if (prediction.model_name == "image") {
            console.log({prediction})
            return (
                <div className="flex flex-wrap gap-2">
                    {prediction.uploaded_images.map((img: string) =>
                        <Image className="rounded-lg" src={img.file_path} alt="" width={100} height={100}/>
                    )}
                </div>
            )
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <PageTitle title={`Prediction Detail ${params?.id}`} />
            <p><b>Created at:</b> {" "} {new Date(prediction?.created_at).toLocaleString()}</p>
            <p><b>Predicted by:</b> {prediction.model_name}</p>
            <p><b>Detail:</b></p>
            {Detail(prediction)}
            <p className="mt-5 font-bold">Predict Result:</p>
            <List>
                {prediction.results.map((diease: Disease, key: number) => (
                    <ListItem key={key} disablePadding className={"hover:bg-gray-200 p-2"}>
                        <ListItemIcon>
                            <CoronavirusIcon />
                        </ListItemIcon>
                        <ListItemText primary={diease.disease_name} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default PredictionDetail
