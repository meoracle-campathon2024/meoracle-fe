export const PATH = {
    LOGIN: '/login',
    REGISTER: '/register',
    HOME: '/home',
    CHOICE_PREDICT: '/choicePredict',
    IMAGE_PREDICT: '/imagePredict',
    NLP_PREDICT: '/nlpPredict',
    PREDICT_HISTORY: '/predictHistory',
    APPOINTMENTS: '/appointments',
    ACCOUNT: '/account',
    SETTINGS: '/settings',
    DISEASE: (id: string|number) => `/disease/${id}`,
    APPOINTMENT: (id: string|number) => `${PATH.APPOINTMENTS}/${id}`,
    PREDICTION: (id: string|number) => `${PATH.PREDICT_HISTORY}/${id}`,
    MAKE_APPOINTMENT: (id: string|number) => `/makeAppointment/${id}`
}
