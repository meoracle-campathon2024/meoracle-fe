'use client';

import { Prediction } from "@/interfaces/Prediction";
import { Box, TextField } from "@mui/material";
import classNames from "classnames";

export function SymptomsBox({ queryDetail }: {
    queryDetail: Prediction | null,
}) {
    return <>
        <Box component="fieldset">
            <legend>{"Your Symptoms"}</legend>

            {
                null === queryDetail
                ? <></>
                : <>{
                    queryDetail.model_name === 'classification'
                    ? <>{
                        queryDetail.selected_symptoms.map((symptom, key) => {
                            return <button key={key}
                                className={classNames("rounded-lg mb-2 p-2 border-2 mr-2", "bg-gray-300" /*"font-bold bg-blue-100"*/)}
                                onClick={e => e.preventDefault()}
                            >
                                {symptom.name}
                            </button>;
                        })
                    }</>
                    : queryDetail.model_name === 'image'
                    ? <>{
                        queryDetail.uploaded_images.map((imageInfo, key) => {
                            return <img key={key} className="rounded-lg"
                                src={imageInfo.file_path}
                                alt={`symptom image number ${1+key}`}
                                width={100} height={100}
                            />;
                        })
                    }</>
                    : <>
                        <TextField fullWidth multiline rows={4} id="outlined-basic" variant="outlined" className="max-w-[500px]">
                            {queryDetail.query_content}
                        </TextField>
                    </>
                }</>
            }
        </Box>
    </>;
}

