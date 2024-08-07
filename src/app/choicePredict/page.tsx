'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import classNames from 'classnames';
import axios from "axios";
import PredictButton from "@/components/PredictButton";
import ListDieases from "@/components/listDiseases";
import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Snackbar, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAuth } from "@/providers/AuthProvider";

type Symptom = {
    id: number;
    name: string;
    vector_index: number;
    classification_symptom_group_id: number;
};

type SymptomGroupWithChildren = {
    id: number;
    parent_id: number | null;
    name: string;
    tier: number;
    symptoms: Symptom[];
    subgroups: SymptomGroupWithChildren[];
};

function Choice({ key, symptom, listIdsSelected, setSelected }: {
    key: React.Key,
    symptom: Symptom,
    listIdsSelected: number[],
    setSelected: (id: number, selected: boolean) => any,
}) {
    const meSelected: boolean = useMemo(() => {
        return listIdsSelected.includes(symptom.id);
    }, [symptom, listIdsSelected]);

    return <button key={key} className={classNames("rounded-lg mb-2 p-2 border-2 mr-2", meSelected ? "font-bold bg-blue-100" : null)} onClick={() => setSelected(symptom.id, !meSelected)}>
        {symptom.name}
    </button>;
}

function ChoiceGroup({ key, symptomGroup, listIdsSelected, setSelected }: {
    key: React.Key,
    symptomGroup: SymptomGroupWithChildren,
    listIdsSelected: number[],
    setSelected: (id: number, selected: boolean) => any,
}) {
    console.log({ symptomGroup })
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
            >
                <h2 className="font-bold mb-2">{symptomGroup.name}</h2>
            </AccordionSummary>
            <AccordionDetails>
                <div className="flex flex-wrap gap-2">
                    {
                        symptomGroup.symptoms.map((symptom, key) => {
                            return <Choice symptom={symptom} key={key} listIdsSelected={listIdsSelected} setSelected={setSelected} />;
                        })
                    }
                </div>
                <br />
                <div className="">
                    {
                        symptomGroup.subgroups.map((group, key) => {
                            return <ChoiceGroup key={key} symptomGroup={group} listIdsSelected={listIdsSelected} setSelected={setSelected} />;
                        })
                    }
                </div>
            </AccordionDetails>
        </Accordion>)
}

export default function ChoiceSelector() {
    const auth = useAuth();
    const [symptomGroups, setSymptomGroups] = useState([] as SymptomGroupWithChildren[]);
    const [selectedChoiceIds, setSelectedChoiceIds] = useState([] as number[]);
    const [dieases, setDieases] = useState([]);
    const [predicting, setPredicting] = useState(false);
    const [displayedError, _real_setDisplayedError] = useState("");

    const displayedErrorFadeTimeout = useRef<NodeJS.Timeout | null>(null);
    const setDisplayedError = useCallback((newValue: string) => {
        _real_setDisplayedError(newValue);

        if (null !== displayedErrorFadeTimeout.current) {
            clearTimeout(displayedErrorFadeTimeout.current);
        }

        if (newValue === "") return;

        displayedErrorFadeTimeout.current = setTimeout(() => {
            _real_setDisplayedError("");
        }, 3000);
    }, [_real_setDisplayedError]);

    useEffect(() => {
        if (!auth.authenticated) return;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classification/symptom-groups`, {
            method: 'GET',
            credentials: 'include',
        }).then(async res => {
            const status = res.status;
            const data = await res.json();
            if (status !== 200) {
                throw new Error(`server returned ${status}, error ${data?.message || "" + data}`);
            }
            const symptomGroups_ = data as SymptomGroupWithChildren[];
            setSymptomGroups(symptomGroups_);
        }).catch(e => {
            throw e;
        });
    }, [auth]);

    // const findSymptomById = useCallback((id: number, rootGroup: SymptomGroupWithChildren|null = null): Symptom|null => {
    //     let groupsToScan;
    //     if (rootGroup === null) {
    //         groupsToScan = symptomGroups;
    //     } else {
    //         groupsToScan = rootGroup.subgroups;
    //     }
    //     for (const group of groupsToScan) {
    //         const symptom = findSymptomById(id, group);
    //         if (symptom !== null) return symptom;
    //     }
    //     return null;
    // }, [symptomGroups]);

    const setSelected = useCallback((id: number, selected: boolean) => {
        if (selected === false) {
            setSelectedChoiceIds(selectedChoiceIds => selectedChoiceIds.filter(choiceId => choiceId !== id));
        } else {
            setSelectedChoiceIds(selectedChoiceIds => [...selectedChoiceIds, id]);
        }
    }, [setSelectedChoiceIds]);

    const callClassificationModel = useCallback(async (selected_ids: number[]) => {
        setDieases([])
        setPredicting(true)
        setDisplayedError("");

        try {
            if (selectedChoiceIds.length === 0) {
                setDisplayedError("No symptoms selected!");
                return;
            }

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/classification/query`, {
                selected_classification_symptom_ids: selected_ids,
            }, {
                withCredentials: true,
            });

            setDieases(res.data)
        } finally {
            setPredicting(false)
        }
    }, [selectedChoiceIds, setDieases, setPredicting, setDisplayedError]);

    return <>
        <PageTitle title={"Symtoms Predict"} />
        <div className="flex items-center max-w-[500px]">
            <Image
                src="/choicePredict.png"
                width={250}
                height={250}
                className="mb-2 max-w-[100px]"
                alt=""
            />
            <p>{"Choose symtoms you have, and I'll try to figure out what might be wrong!"}</p>
        </div>
        <div>
            {
                symptomGroups ? (symptomGroups.map((group, key) => {
                    return <ChoiceGroup key={key} symptomGroup={group} listIdsSelected={selectedChoiceIds} setSelected={setSelected} />
                })) : (<span>Loading...</span>)
            }
        </div>
        <PredictButton onClick={() => callClassificationModel(selectedChoiceIds)} predicting={predicting} isHidden={!auth.authenticated}>Predict</PredictButton>

        <Snackbar open={Boolean(displayedError)} autoHideDuration={100} anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
        }}>
            <Alert
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {displayedError || ""}
            </Alert>
        </Snackbar >


        <ListDieases dieases={dieases} />
    </>;
}