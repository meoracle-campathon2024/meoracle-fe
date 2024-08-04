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

export default function MultiImageDropzoneUsage() {
    const auth = useAuth();

    const [fileStates, setFileStates] = useState<FileState[]>([]);

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
        ///////////////////////////////////////////
        // TODO: adjust imagePredict() to accept uploadedFilePaths and forward to server
        // await imagePredict({ uploadedFilePaths });
        ///////////////////////////////////////////
        const result = await imagePredict()
        setDieases(result)
    }, [setDieases]);

    const onPredictButtonClick = useCallback(async () => {
        if (!auth.authenticated) return;

        const uploadedFilePaths = await Promise.all(
            fileStates.map(async (addedFileState) => {
                const addedFile = addedFileState.file;
                const fileObjectUrl = URL.createObjectURL(addedFile);
                for (;;) {
                    try {
                        const { filePath } = await uploadImageFile(auth.user, fileObjectUrl);
                        return filePath;
                    } catch (err) {
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
            {
                auth.authenticated
                ? <p>You are authenticated with ID={auth.user.id}</p>
                : <p>NOT AUTHENTICATED, error: {auth.error || "null"}</p>
            }
            <MultiImageDropzone
                className='max-w-[500px] mx-auto'
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
            <PredictButton onClick={() => onPredictButtonClick()}>
                Predict
            </PredictButton>
            <ListDieases dieases={dieases} />
        </>
    );
}
