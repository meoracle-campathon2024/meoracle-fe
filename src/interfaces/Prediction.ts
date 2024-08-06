export type Prediction = {
    id: number;
    created_at: number;
    results: {
        id: number;
        created_at: number;
        disease_name: string;
        priority: number;
    }[];
    model_name: "nlp";
    query_content: string;
} | {
    id: number;
    created_at: number;
    results: {
        id: number;
        created_at: number;
        disease_name: string;
        priority: number;
    }[];
    model_name: "classification";
    selected_symptoms: {
        id: number;
        name: string;
    }[];
} | {
    id: number;
    created_at: number;
    results: {
        id: number;
        created_at: number;
        disease_name: string;
        priority: number;
    }[];
    model_name: "image";
    uploaded_images: {
        file_path: string;
    }[];
};
