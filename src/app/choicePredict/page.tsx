'use client';

import ListDieases from "@/components/listDiseases";
import PredictButton from "@/components/PredictButton";
import PageTitle from "@/components/PageTitle/PageTitle";
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Disease } from "@/interfaces/Disease";
import { choicePredict } from "@/utils/backend";
import { API } from "@/config/api";
import axios from "axios";
import useSWR from "swr";
import Image from "next/image";
import { Alert, Snackbar } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ChoicePredict = () => {
    const [dieases, setDieases] = React.useState<Disease[]>([]);
    const [alertQueryIsEmpty, setAlertQueryIsEmpty] = React.useState<boolean>(false);
    const [predicting, setPredicting] = React.useState<boolean>(false);

    const { data: symtoms, error: errorGetSymtoms } = useSWR<any[], Error>(
        API.CLASSIFICATION.symtoms,
        async (url: string) => {
            const res = await axios.get(url, { withCredentials: true });
            return res.data;
        }
    );

    const predict = async () => {
        setDieases([]);
        setPredicting(false)

        const result = await choicePredict();

        setDieases(result);
        setPredicting(true)
    };

    return (
        <>
            <PageTitle title={"CHOICE PREDICT"} />
            <div className="flex items-center max-w-[500px]">
                <Image
                    src="/choicePredict.png"
                    width={250}
                    height={250}
                    className="mb-2 max-w-[100px]"
                    alt=""
                />
                "Pick your symptoms, and I'll guess what might be wrong!"
            </div>
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={top100Films}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                renderOption={(props, option, { selected }) => {
                    const { key, ...optionProps } = props;
                    return (
                        <li key={key} {...optionProps}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.title}
                        </li>
                    );
                }}
                style={{ width: 500 }}
                renderInput={(params) => (
                    <TextField {...params} label="Symtoms" placeholder="Your symtoms" />
                )}
            />
            <PredictButton onClick={predict} predicting={predicting}/>
            <ListDieases dieases={dieases} />

            <Snackbar open={alertQueryIsEmpty} autoHideDuration={1000} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}>
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Please choose symtoms
                </Alert>
            </Snackbar >
        </>
    );
};

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'đầu', year: 2014 },
];

export default ChoicePredict;