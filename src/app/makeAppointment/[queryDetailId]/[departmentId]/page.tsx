'use client';

import PageTitle from "@/components/PageTitle/PageTitle";
import { Department } from "@/interfaces/Department";
import { getDepartmentById, getQueryDetailById, makeAppointment } from "@/utils/backend";
import { Box, Button, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { DateField } from '@mui/x-date-pickers/DateField';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { Prediction } from "@/interfaces/Prediction";
import { useRouter } from "next/navigation";
import { PATH } from "@/config/path";
import { SymptomsBox } from "@/components/SymptomBox";

const LOADING_TEXT = "...";

const MakeAppointment = ({ params: { queryDetailId, departmentId } }: {
    params: {
        queryDetailId: string,
        departmentId: string,
    }
}) => {
    const router = useRouter();

    const [department, setDepartment] = useState(null as Department | null);

    const [queryDetail, setQueryDetail] = useState(null as Prediction | null);

    useEffect(() => {
        getDepartmentById({ departmentId: +departmentId }).then(department => setDepartment(department));

        getQueryDetailById({ queryDetailId: +queryDetailId }).then(queryDetail => setQueryDetail(queryDetail));
    }, [departmentId, queryDetailId]);

    // Your = User's
    const [yourName, setYourName] = useState("");
        const [yourNameError, setYourNameError] = useState(false);
    const [yourDateOfBirth, setYourDateOfBirth] = useState<Dayjs | null>(null);
        const [yourDateOfBirthError, setYourDateOfBirthError] = useState(false);
    const [yourEmail, setYourEmail] = useState("");
        const [yourEmailError, setYourEmailError] = useState(false);
    const [yourPhoneNumber, setYourPhoneNumber] = useState("");
        const [yourPhoneNumberError, setYourPhoneNumberError] = useState(false);

    const callMakeAppointment = useCallback(async () => {
        setYourNameError(false);
        setYourDateOfBirthError(false);
        setYourEmailError(false);
        setYourPhoneNumberError(false);

        if (!yourName) {
            setYourNameError(true);
            return;
        }

        if (!yourDateOfBirth) {
            setYourDateOfBirthError(true);
            return;
        }

        if (!yourEmail) {
            setYourEmailError(true);
            return;
        }

        if (!yourPhoneNumber) {
            setYourPhoneNumberError(true);
            return;
        }

        const appointment = await makeAppointment({
            departmentId: +departmentId,
            queryDetailId: +queryDetailId,
            note: JSON.stringify({
                userInfo: {
                    name: yourName,
                    dateOfBirth: yourDateOfBirth.unix(),
                    email: yourEmail,
                    phoneNumber: yourPhoneNumber,
                }
            }),
        });

        router.push(PATH.APPOINTMENT(appointment.id));
    }, [router, yourName, yourDateOfBirth, yourEmail, yourPhoneNumber, departmentId, queryDetailId]);

    return (
        isNaN(+departmentId) || isNaN(+queryDetailId)
        ? <>Page Not Found</>
        : <LocalizationProvider dateAdapter={AdapterDayjs}>
            <PageTitle title={"Make Appointment"} />

            <Box
                component="form"
                className="my-10"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Box component="fieldset">
                    <legend>{"Hospital and Department"}</legend>

                    <TextField disabled InputLabelProps={{ shrink: true }} inputProps={{ readOnly: true }}
                        label="Hospital"
                        helperText={department ? department.hospital.full_address : ""}
                        value={department ? department.hospital.name : LOADING_TEXT}
                    />

                    <TextField disabled InputLabelProps={{ shrink: true }} inputProps={{ readOnly: true }}
                        label="Department"
                        helperText={department ? department.specific_address : ""}
                        value={department ? department.name : LOADING_TEXT}
                    />
                </Box>

                <SymptomsBox queryDetail={queryDetail} />

                <Box component="fieldset">
                    <legend>{"Your Personal Information"}</legend>

                    <TextField required label="Name" value={yourName} onChange={event => setYourName(event.target.value)} error={yourNameError} />
                    <DateField required label="Date of Birth" value={yourDateOfBirth} onChange={d => setYourDateOfBirth(d)} helperText={yourDateOfBirthError ? "Invalid date" : ""} />
                    <TextField required label="Email" value={yourEmail} onChange={event => setYourEmail(event.target.value)} error={yourEmailError} />
                    <TextField required label="Phone number" value={yourPhoneNumber} onChange={event => setYourPhoneNumber(event.target.value)} error={yourPhoneNumberError} />
                </Box>

                <Box>
                    <Button variant="contained" onClick={() => callMakeAppointment()}>{"Make Appointment"}</Button>
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default MakeAppointment;
