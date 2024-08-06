import { API } from "@/config/api";
import { PATH } from "@/config/path";
import { Prediction } from "@/interfaces/Prediction";
import { Button, List, ListItem, ListItemIcon, ListItemText, Pagination } from "@mui/material";

const ListPredictions = ({ predictions = [] }: { predictions: Prediction[] }) => {
    return (
        <>
            <h3>{predictions.length} predictions</h3>
            <List>
                {predictions.map((prediction, key) => (
                    <ListItem key={key} disablePadding secondaryAction={<Button href={PATH.PREDICTION(prediction.id)}>Detail</Button>} className={"hover:bg-gray-200 p-2"}>
                        <ListItemText primary={prediction.model_name} secondary={new Date(prediction.created_at).toLocaleString()} />
                    </ListItem>
                    ))} 
            </List>
            <Pagination count={2} className="w-max mx-auto mt-5" />
        </>
    )
}

export default ListPredictions