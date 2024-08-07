export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

const AUTH = {
    login: `${BASE_API_URL}/auth/login`,
    register: `${BASE_API_URL}/auth/register`,
    anonymous: `${BASE_API_URL}/api/auth/anonymous`
}

const CLASSIFICATION = {
    symtoms: `${BASE_API_URL}/api/classification/symptom-groups`,
    predict: `${BASE_API_URL}/api/classification/query`,
}

const IMAGE = {
    predict: `${BASE_API_URL}/api/image-model/query`
}

const NLP = {
    predict: `${BASE_API_URL}/api/nlp/query`
}

const APPOINTMENTS = {
    suggestions: `${BASE_API_URL}/api/appointments/suggestions`,
}

const GEOGRAPHY = {
    countries: `${BASE_API_URL}/api/countries`,
    divisions: `${BASE_API_URL}/api/divisions`,
}

const OTHERS = {
    listPredictions: `${BASE_API_URL}/api/queries`
}

export const API = {
    AUTH,
    CLASSIFICATION,
    IMAGE,
    NLP,
    APPOINTMENTS,
    GEOGRAPHY,
    OTHERS
}
