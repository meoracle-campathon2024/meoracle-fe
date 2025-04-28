'use client';

import { API } from "@/config/api";
import { Appointment } from "@/interfaces/Appointment";
import { Coordinates } from "@/interfaces/Coordinates";
import { Country } from "@/interfaces/Country";
import { Department } from "@/interfaces/Department";
import { Disease } from "@/interfaces/Disease";
import { Division } from "@/interfaces/Division";
import { Prediction } from "@/interfaces/Prediction";
import { PredictionResult } from "@/interfaces/PredictionResult";
import { QueryDetail } from "@/interfaces/QueryDetail";
import axios from "axios";
import OpenAI from "openai";

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

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true,
});

export async function classificationPredict(selectedSymptomsIds: number[]): Promise<PredictionResult> {
    const res = await axios.post(API.CLASSIFICATION.predict, {
        selected_classification_symptom_ids: selectedSymptomsIds,
    }, {
        withCredentials: true,
    });
    return res.data;
}

export async function imagePredict(uploadedFilePaths: string[]): Promise<PredictionResult> {
    const res = await axios.post(API.IMAGE.predict, { uploaded_file_paths: uploadedFilePaths }, { withCredentials: true })
    return res.data
}

export async function nlpPredict(query: string): Promise<PredictionResult> {
    const now = Date.now();

    const systemPrompt = `
Bạn là một hệ thống có khả năng chẩn đoán bệnh dựa trên triệu chứng của người dùng.
Trả lời dưới dạng JSON theo cấu trúc sau (không cần giải thích gì thêm ngoài JSON):

{
  "detected_diseases": [
    {
      "disease_name": string,
      "explanation": string, // giải thích lý do vì sao lại chẩn đoán bệnh này từ triệu chứng
      "references": [string] // danh sách nguồn tài liệu uy tín, link web hoặc tên sách
    }
  ]
}

Không bao giờ trả lời khác ngoài JSON. Nếu không chẩn đoán được bệnh thì trả mảng rỗng.
Luôn nhắc nhở người dùng rằng đây chỉ là dự đoán sơ bộ, không thay thế cho thăm khám y tế.
`;

    const completion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: query },
        ],
        temperature: 0.7,
    });

    const content = completion.choices[0].message.content || "{}";

    let detected: any[] = [];

    try {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed.detected_diseases)) {
            detected = parsed.detected_diseases;
        }
    } catch (error) {
        console.error("Lỗi khi parse JSON từ GPT:", error);
    }

    // Chuyển đổi mảng bệnh GPT trả về -> dạng Disease[]
    const detectedDiseases: Disease[] = detected.map((disease, index) => ({
        id: index + 1,
        disease_name: disease.disease_name || "Không rõ",
        created_at: now,
        explanation: disease.explanation || "",
        references: Array.isArray(disease.references) ? disease.references : [],
    }));

    const query_detail: QueryDetail = {
        id: Math.floor(Math.random() * 100000),
        created_at: now,
    };

    return {
        query_detail,
        detected_diseases: detectedDiseases,
    };
}

export async function getAppointmentSuggestions(queryDetail: QueryDetail, location: Coordinates | null): Promise<AppointmentSuggestion[]> {
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

export async function getDivisions({ countryId }: {
    countryId: number,
}): Promise<Division[]> {
    const res = await axios.get(
        API.GEOGRAPHY.divisions + `?country_id=${countryId}`,
        { withCredentials: true },
    );
    return res.data;
}

export async function getDepartmentById({ departmentId }: {
    departmentId: number,
}): Promise<Department> {
    const res = await axios.get(
        API.APPOINTMENTS.departments + `?department_id=${departmentId}`,
        { withCredentials: true },
    );
    return (res.data as Department[])[0];
}

export async function getQueryDetailById({ queryDetailId }: {
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

export async function getAppointmentById({ appointmentId }: {
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
