'use client';

import PageTitle from "@/components/PageTitle/PageTitle"

const Disease = ({ params: { id } } : {
    params: {
        id: string,
    }
}) => {
    return (
        <>
            <PageTitle title={"Disease"} />
            <p>Name: </p>
            <p>Describe: </p>
        </>
    )
}

export default Disease
