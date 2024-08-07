'use client';

import React, { useCallback, useState } from 'react';

import ListDieases from '@/components/listDiseases';
import MultiImageDropzone, { FileState } from '@/components/multilImageDropzone';
import PageTitle from '@/components/PageTitle/PageTitle';
import PredictButton from '@/components/PredictButton';
import { Disease } from '@/interfaces/Disease';
import { imagePredict } from '@/utils/backend';
import { uploadImageFile } from '@/utils/uploadImage';
import { useAuth } from '@/providers/AuthProvider';
import { Alert, Snackbar } from '@mui/material';
import Image from 'next/image';
import { QueryDetail } from '@/interfaces/QueryDetail';

export default function MultiImageDropzoneUsage() {
    const auth = useAuth();

    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const [alertQueryIsEmpty, setAlertQueryIsEmpty] = React.useState<boolean>(false);
    const [predicting, setPredicting] = React.useState<boolean>(false);

    const updateFileProgress = useCallback((key: string, progress: FileState['progress']) => {
        setFileStates((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find(
                (fileState) => fileState.key === key,
            );
            if (fileState) {
                fileState.progress = progress;
            }
            return newFileStates;
        });
    }, [setFileStates]);

    const [dieases, setDieases] = React.useState<Disease[]>([]);
    const [queryDetail, setQueryDetail] = useState<QueryDetail|null>(null);

    const predict = useCallback(async (uploadedFilePaths: string[]) => {
        setDieases([])
        setQueryDetail(null);
        setPredicting(true)

        try {
            const { query_detail, detected_diseases } = await imagePredict(uploadedFilePaths);
            setDieases(detected_diseases);
            setQueryDetail({ ...query_detail });
        } finally {
            setPredicting(false);
        }
    }, [setDieases, setPredicting, setQueryDetail]);

    const onPredictButtonClick = useCallback(async () => {
        setDieases([])
        setPredicting(true)

        try {
            if (!auth.authenticated) {
                console.log("unauthenticated")
                setPredicting(false)
                return;
            };

            if (!fileStates.length) {
                console.log("empty file")
                setAlertQueryIsEmpty(true)
                setPredicting(false)
                return;
            }
            setAlertQueryIsEmpty(false)

            console.log("uploading")
            const uploadedFilePaths = await Promise.all(
                fileStates.map(async (addedFileState) => {
                    const addedFile = addedFileState.file;
                    for (; ;) {
                        try {
                            const { filePath } = await uploadImageFile(auth.user, addedFile);
                            return filePath;
                        } catch (err) {
                            console.log(err);
                            updateFileProgress(addedFileState.key, 'ERROR');
                            await new Promise(resolve => setTimeout(() => resolve(null), 1000));
                            continue;
                        }
                    }
                }),
            );
            console.log("uploaded")

            await predict(uploadedFilePaths);
        } finally {
            setPredicting(false);
        }
    }, [auth, fileStates, updateFileProgress, predict, setDieases, setPredicting, setAlertQueryIsEmpty]);

    return (
        <>
            <PageTitle title={"IMAGE PREDICT"} />
            <div className="flex items-center max-w-[500px]">
                <Image
                    src="/imagePredict.png"
                    width={250}
                    height={250}
                    className="mb-2 max-w-[100px]"
                    alt=""
                />
                <p>{"Send me an image of your symptoms, and I'll try to figure out what might be wrong!"}</p>
            </div>
            <MultiImageDropzone
                className='max-w-[500px]'
                value={fileStates}
                dropzoneOptions={{
                    maxFiles: 100,
                }}
                onChange={(files) => {
                    setFileStates(files);
                }}
                onFilesAdded={async (addedFiles) => {
                    setFileStates([...fileStates, ...addedFiles]);
                }}
            />
            <PredictButton onClick={onPredictButtonClick} predicting={predicting} isHidden={!auth.authenticated}>
                Predict
            </PredictButton>
            <ListDieases dieases={dieases} queryDetail={queryDetail} />

            <Snackbar open={alertQueryIsEmpty} autoHideDuration={100} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}>
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Please upload images to predict
                </Alert>
            </Snackbar >
        </>
    );
}
