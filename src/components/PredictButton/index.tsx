import { Fab } from '@mui/material';
import Button from '@mui/material/Button';
import { NavigationIcon } from 'lucide-react';


const PredictButton = ({ ...props }) => {
    return (
        <Button size="large" {...props} className="uppercase text-lg tracking-wider mt-5">PREDICT</Button>
    )
}

export default PredictButton