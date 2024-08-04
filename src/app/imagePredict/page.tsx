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
    }, [fileStates, setFileStates]);

    const [dieases, setDieases] = React.useState<Disease[]>([]);

    const predict = useCallback(async (uploadedFilePaths: string[]) => {
        setDieases([])
        setPredicting(true)
        const result = await imagePredict(uploadedFilePaths)

        setPredicting(false)
        setDieases(result)
    }, [setDieases]);

    const onPredictButtonClick = useCallback(async () => {
        setDieases([])

        if (!auth.authenticated) {
            return;
        };

        if (!fileStates.length) {
            setAlertQueryIsEmpty(true)
            return;
        }
        setAlertQueryIsEmpty(false)

        const uploadedFilePaths = await Promise.all(
            fileStates.map(async (addedFileState) => {
                const addedFile = addedFileState.file;
                for (;;) {
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

        predict(uploadedFilePaths);
    }, [auth, fileStates, updateFileProgress]);

    return (
        <>
            <PageTitle title={"IMAGE PREDICT"} />
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
            <PredictButton onClick={onPredictButtonClick} predicting={predicting}>
                Predict
            </PredictButton>
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
                    Please upload images to predict
                </Alert>
            </Snackbar >
        </>
    );
}
