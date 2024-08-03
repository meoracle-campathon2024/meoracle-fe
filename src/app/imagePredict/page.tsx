'use client';

import React, { useState } from 'react';

import ListDieases from '@/components/listDiseases';
import MultiImageDropzone, { FileState } from '@/components/multilImageDropzone';
import PageTitle from '@/components/PageTitle/PageTitle';
import PredictButton from '@/components/PredictButton';
import { Disease } from '@/interfaces/Disease';
import { imagePredict } from '@/utils/backend';

export default function MultiImageDropzoneUsage() {
    const [fileStates, setFileStates] = useState<FileState[]>([]);

    function updateFileProgress(key: string, progress: FileState['progress']) {
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
    }

    const [dieases, setDieases] = React.useState<Disease[]>([]);

    const predict = async () => {
        const result = await imagePredict()
        setDieases(result)
    }

    return (
        <>
            <PageTitle title={"IMAGE PREDICT"} />
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
            <PredictButton onClick={async () => {
                await Promise.all(
                    fileStates.map(async (addedFileState) => {
                        try {
                            //upload file
                        } catch (err) {
                            updateFileProgress(addedFileState.key, 'ERROR');
                        }
                    }),
                );
                predict()
            }}>
                Predict
            </PredictButton>
            <ListDieases dieases={dieases} />
        </>
    );
}
