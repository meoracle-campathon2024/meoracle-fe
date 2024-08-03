'use client';

import { Disease } from "@/interfaces/Disease"

export async function choicePredict(): Promise<Disease[]> {
    return [
        {
            id: 11,
            created_at: "11/11/2011",
            disease_name: 'Trật khớp',
        },
        {
            id: 11,
            created_at: "11/11/2011",
            disease_name: 'Chuột rút',
        },
        {
            id: 11,
            created_at: "11/11/2011",
            disease_name: 'Đau mắt đỏ',
        }
    ]
}

export async function imagePredict(): Promise<Disease[]> {
    return [
        {
            id: 11,
            created_at: "11/11/2011",
            disease_name: 'Trật khớp',
        },
        {
            id: 11,
            created_at: "11/11/2011",
            disease_name: 'Chuột rút',
        },
        {
            id: 11,
            created_at: "11/11/2011",
            disease_name: 'Đau mắt đỏ',
        }
    ]
}

export async function nlpPredict(): Promise<Disease[]> {
    return [
        {
            id: 11,
            created_at: "11/11/2011",
            disease_name: 'Trật khớp',
        },
        {
            id: 11,
            created_at: "11/11/2011",
            disease_name: 'Chuột rút',
        },
        {
            id: 11,
            created_at: "11/11/2011",
            disease_name: 'Đau mắt đỏ',
        }
    ]
}
