export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

const AUTH = {
    login: `${BASE_API_URL}/auth/login`,
    register: `${BASE_API_URL}/auth/register`,
    anonymous: `${BASE_API_URL}/api/auth/anonymous`
}

const CLASSIFICATION = {
    symtoms: `${BASE_API_URL}/api/classification/symptom-groups`
}

const IMAGE = {
    predict: `${BASE_API_URL}/api/image/query`
}

const NLP = {
    predict: `${BASE_API_URL}/api/nlp/query`
}

export const API = {
    AUTH,
    CLASSIFICATION,
    IMAGE,
    NLP
}
