'use client';

import ListAppointMents from "@/components/listAppointments";
import PageTitle from "@/components/PageTitle/PageTitle";
import type { NextPage } from "next";

const Appointments: NextPage = () => {
    return (
        <>
            <PageTitle title={"APPOINTMENTS"}/>
            <ListAppointMents appointments={[]} />
        </>
    );
};

export default Appointments;
