import { Disease } from "./Disease";
import { QueryDetail } from "./QueryDetail";

export type PredictionResult = {
    query_detail: QueryDetail,
    detected_diseases: Disease[],
};
