const PredictButton = ({ predicting, ...props }: { predicting?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    if (predicting) {
        return (
            <button className="mt-2 tracking-wider bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" {...props}>
                PREDICTING...
            </button>
        )
    }

    return (
        <button className="mt-2 tracking-wider bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" {...props}>
            PREDICT
        </button>
    )
}

export default PredictButton