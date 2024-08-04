import Button from '@mui/material/Button';


const PredictButton = ({ onClick, predicting, ...props }: { onClick?: any, predicting?: boolean, props: any }) => {
    if (predicting) {
        return <button onClick={onClick} className="mt-2 tracking-wider bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" {...props}>
            PREDICTING...
        </button>
    }

    return (
        <button onClick={onClick} className="mt-2 tracking-wider bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" {...props}>
            PREDICT
        </button>
    )
}

export default PredictButton