'use client';

import PageTitle from "@/components/PageTitle/PageTitle";
import type { NextPage } from "next";

import { PATH } from "@/config/path"
import { Button, List, ListItem, ListItemIcon, ListItemText, Pagination } from "@mui/material"
import FeedIcon from '@mui/icons-material/Feed';
import { Appointment } from "@/interfaces/Appointment";
import { useRouter } from "next/navigation";
import { getAllAppointments } from "@/utils/backend";
import { useEffect, useState } from "react";

const ListAppointments = ({ appointments }: { appointments: Appointment[] }) => {
    const router = useRouter();

    return (
        <>
            <h3>{appointments.length} appointments</h3>
            <List>
                {appointments.map((appointment, key) => (
                    <ListItem key={key} disablePadding secondaryAction={
                        <Button onClick={() => router.push(PATH.APPOINTMENT(appointment.id))}>Detail</Button>
                    } className={"hover:bg-gray-200 p-2"}>
                        <ListItemIcon>
                            <FeedIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={appointment.department.name + ", " + appointment.department.hospital.name}
                            secondary={(new Date(appointment.created_at)).toLocaleString()}
                        />
                    </ListItem>
                ))}
            </List>
            <Pagination count={10} className="w-max mx-auto mt-5" />
        </>

    )
}

const Appointments: NextPage = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        getAllAppointments().then(appointments => setAppointments(appointments));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <PageTitle title={"APPOINTMENTS"}/>
            <ListAppointments appointments={appointments} />
        </>
    );
};

export default Appointments;
