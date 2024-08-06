'use client';

import { API } from "@/config/api";
import { Disease } from "@/interfaces/Disease"
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

export async function imagePredict(uploadedFilePaths:string[]): Promise<Disease[]> {
    const res = await axios.post(API.IMAGE.predict, {uploaded_file_paths: uploadedFilePaths}, {withCredentials: true}) 
    return res.data 
}

export async function nlpPredict(query: string): Promise<Disease[]> {
    const res = await axios.post(API.NLP.predict, {query_content: query}, {withCredentials: true})
    return res.data
}
