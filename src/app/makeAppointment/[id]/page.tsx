import PageTitle from "@/components/PageTitle/PageTitle";

const MakeAppointment = ({ params: { id } } : {
    params: {
        id: string,
    }
}) => {
    return (
        <>
            <PageTitle title={"Make Appointment"} />
        </>
    );
};

export default MakeAppointment;
