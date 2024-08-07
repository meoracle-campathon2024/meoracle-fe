'use client';

import { API } from "@/config/api";
import { Appointment } from "@/interfaces/Appointment";
import { Coordinates } from "@/interfaces/Coordinates";
import { Country } from "@/interfaces/Country";
import { Department } from "@/interfaces/Department";
import { Division } from "@/interfaces/Division";
import { Prediction } from "@/interfaces/Prediction";
import { PredictionResult } from "@/interfaces/PredictionResult";
import { QueryDetail } from "@/interfaces/QueryDetail";
import axios from "axios";

// export async function choicePredict(): Promise<Disease[]> {
//     return [
//         {
//             id: 11,
//             created_at: "11/11/2011",
//             disease_name: 'Trật khớp',
//         },
//         {
//             id: 11,
//             created_at: "11/11/2011",
//             disease_name: 'Chuột rút',
//         },
//         {
//             id: 11,
//             created_at: "11/11/2011",
//             disease_name: 'Đau mắt đỏ',
//         }
//     ]
// }

export async function classificationPredict(selectedSymptomsIds: number[]): Promise<PredictionResult> {
    const res = await axios.post(API.CLASSIFICATION.predict, {
        selected_classification_symptom_ids: selectedSymptomsIds,
    }, {
        withCredentials: true,
    });
    return res.data;
}

export async function imagePredict(uploadedFilePaths:string[]): Promise<PredictionResult> {
    const res = await axios.post(API.IMAGE.predict, {uploaded_file_paths: uploadedFilePaths}, {withCredentials: true}) 
    return res.data 
}

export async function nlpPredict(query: string): Promise<PredictionResult> {
    const res = await axios.post(API.NLP.predict, {query_content: query}, {withCredentials: true})
    return res.data
}

export async function getAppointmentSuggestions(queryDetail: QueryDetail, location: Coordinates|null): Promise<AppointmentSuggestion[]> {
    const res = await axios.get(
        API.APPOINTMENTS.suggestions + `?query_detail_id=${queryDetail.id}` + (
            null === location ? "" : `&lat=${location.lat}&lon=${location.lon}`
        ),
        { withCredentials: true }
    );
    return res.data;
}

export async function getCountries(): Promise<Country[]> {
    const res = await axios.get(
        API.GEOGRAPHY.countries,
        { withCredentials: true },
    );
    return res.data;
}

export async function getDivisions({ countryId } : {
    countryId: number,
}): Promise<Division[]> {
    const res = await axios.get(
        API.GEOGRAPHY.divisions + `?country_id=${countryId}`,
        { withCredentials: true },
    );
    return res.data;
}

export async function getDepartmentById({ departmentId } : {
    departmentId: number,
}): Promise<Department> {
    const res = await axios.get(
        API.APPOINTMENTS.departments + `?department_id=${departmentId}`,
        { withCredentials: true },
    );
    return (res.data as Department[])[0];
}

export async function getQueryDetailById({ queryDetailId } : {
    queryDetailId: number,
}): Promise<Prediction> {
    const res = await axios.get(
        API.QUERIES.getById(queryDetailId),
        { withCredentials: true },
    );
    return (res.data as Prediction[])[0];
}

export async function makeAppointment({ departmentId, queryDetailId, note }: {
    departmentId: number;
    queryDetailId: number;
    note: string;
}): Promise<Appointment> {
    const res = await axios.post(
        API.APPOINTMENTS.make,
        {
            department_id: departmentId,
            query_detail_id: queryDetailId,
            note: note,
        },
        { withCredentials: true },
    );

    return res.data as Appointment;
}

export async function getAppointmentById({ appointmentId } : {
    appointmentId: number,
}): Promise<Appointment> {
    const res = await axios.get(
        API.APPOINTMENTS.getById(appointmentId),
        { withCredentials: true },
    );

    return (res.data as Appointment[])[0];
}

export async function getAllAppointments(): Promise<Appointment[]> {
    const res = await axios.get(
        API.APPOINTMENTS.getAll,
        { withCredentials: true },
    );

    return res.data as Appointment[];
}
