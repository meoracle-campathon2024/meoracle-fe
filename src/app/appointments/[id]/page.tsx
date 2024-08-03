import PageTitle from "@/components/PageTitle";

export default function Appointment({ params: { id }} : {
    params: {
        id: string,
    },
}) {
    return (
        <>
            <PageTitle title={`Appointment Detail id ${id}`} />
            <p>Created at:</p>
            <p>Department name:</p>
            <p>Disease:</p>
        </>
    );
}