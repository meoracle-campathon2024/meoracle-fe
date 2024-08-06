export interface Prediction {
    id: number| string,
    disease_name: string, 
    model_name: string, 
    created_at: string, 
    predict_by: string
    results: any
    query_content: string
    uploaded_image: any
    selected_symptoms: any
}