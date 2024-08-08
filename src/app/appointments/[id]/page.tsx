'use client';

import PageTitle from "@/components/PageTitle";
import { SymptomsBox } from "@/components/SymptomBox";
import { PATH } from "@/config/path";
import { Appointment } from "@/interfaces/Appointment";
import { useAuth } from "@/providers/AuthProvider";
import { getAppointmentById } from "@/utils/backend";
import { Box, Button, TextField } from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const LOADING_TEXT = "...";

export default function AppointmentPage({ params }: {
    params: {
        id: string,
    },
}) {
    const router = useRouter();
    const auth = useAuth();

    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [noSuchAppointment, setNoSuchAppointment] = useState(false);

    useEffect(() => {
        if (!auth.authenticated) return;
        const appointmentId = params.id;
        getAppointmentById({ appointmentId: parseInt(appointmentId) }).then(appointment => setAppointment(appointment)).catch(() => setNoSuchAppointment(true));
    }, [auth, params]);

    const department = useMemo(() => appointment?.department || null, [appointment]);
    const queryDetail = useMemo(() => appointment?.query_detail || null, [appointment]);
    const { yourName, yourDateOfBirth, yourEmail, yourPhoneNumber } = useMemo((): {
        yourName: string,
        yourDateOfBirth: Dayjs | null,
        yourEmail: string,
        yourPhoneNumber: string,
    } => {
        if (!appointment) return {
            yourName: "",
            yourDateOfBirth: null,
            yourEmail: "",
            yourPhoneNumber: "",
        };

        try {
            const { userInfo: { name: yourName, dateOfBirth, email: yourEmail, phoneNumber: yourPhoneNumber } } = JSON.parse(appointment.note);
            return { yourName, yourDateOfBirth: dayjs.unix(dateOfBirth), yourEmail, yourPhoneNumber };
        } catch (e) {
            return {
                yourName: "Unknown (data corrupted)",
                yourDateOfBirth: null,
                yourEmail: "Unknown (data corrupted)",
                yourPhoneNumber: "Unknown (data corrupted)",
            };
        }
    }, [appointment]);

    return (
        <>{
            noSuchAppointment
            ? <PageTitle title={`Appointment Not Found`} />
            : <>
                <PageTitle title={`Appointment Detail`} />

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
                        <legend>{"Appointment Information"}</legend>
                        <DateField disabled label="Appointment Date" value={appointment ? dayjs.unix(appointment.created_at / 1000) : null} />
                        <DateField disabled label="Scheduled Date" value={appointment ? dayjs.unix(appointment.scheduled_at / 1000) : null} />
                    </Box>

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

                        <TextField disabled label="Name" value={yourName} />
                        <DateField disabled label="Date of Birth" value={yourDateOfBirth} />
                        <TextField disabled label="Email" value={yourEmail} />
                        <TextField disabled label="Phone number" value={yourPhoneNumber} />
                    </Box>
                </Box>

                <Button onClick={() => router.push(PATH.APPOINTMENTS)}>{"View all appointments"}</Button>
            </>
        }</>
    );
}
