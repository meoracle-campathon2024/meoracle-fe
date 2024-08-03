'use client';

import PageTitle from "@/components/PageTitle/PageTitle"
import { useParams } from "next/navigation"

const Prediction = () => {
    const params = useParams()
    return (
        <>
            <PageTitle title={`Prediction Detail ${params?.id}`} />
            <p>Created at:</p>
            <p>Predicted by:</p>
            <p>Query:</p>
        </>
    )
}

export default Prediction
