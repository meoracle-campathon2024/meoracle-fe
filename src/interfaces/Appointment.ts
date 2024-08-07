import { Department } from "./Department";
import { Prediction } from "./Prediction";

export type Appointment = {
    id: number;
    note: string;
    created_at: number;
    scheduled_at: number,
    user_id: number;
    department: Department;
    query_detail: Prediction;
};
