import type { NextPage } from "next";
import PageTitle from "@/components/PageTitle/PageTitle";
import { Typography } from "@mui/material";
import Image from "next/image";

const Home: NextPage = () => {
    return (
        <>
            <PageTitle title={"HELLO!!! WE ARE MEODICINE"} />
            <Image
                src="/catHome.png"
                width={300}
                height={300}
                className="mb-2"
                alt=""
            />
            <h1 className="max-w-[500px]">
                <b>Disclaimer: </b>
                The health predictions provided by this AI tool are for <b>informational purposes only </b>and are <b>not intended to be a substitute for professional medical advice, diagnosis, or treatment.</b> While the AI model strives to provide accurate and timely information, it is not infallible and may not account for all relevant factors or individual circumstances.
            </h1>
        </>
    );
};

export default Home;
