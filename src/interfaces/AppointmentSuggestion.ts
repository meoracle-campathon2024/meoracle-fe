type AppointmentSuggestion = {
    name: string;
    id: number;
    hospital: {
        name: string;
        id: number;
        full_address: string;
    };
    specific_address: string;
};
