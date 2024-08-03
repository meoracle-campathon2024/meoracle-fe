import { PATH } from "@/config/path";
import { Button, List, ListItem, ListItemIcon, ListItemText, Pagination } from "@mui/material";
import { InboxIcon } from "lucide-react";

const ListPredictions = () => {
    const predictions = [
        {
            id: 11,
            type: "classify",
            created_at: "11/11/2011",
            disease_name: 'Trật khớp',
        },
        {
            type: "image",
            id: 11,
            created_at: "11/11/2011",
            disease_name: 'Chuột rút',
        },
        {
            type: "nlp",
            id: 11,
            created_at: "11/11/2011",
            disease_name: 'Đau mắt đỏ',
        }
    ];

    return (
        <>
            <h3>{predictions.length} predictions</h3>
            <List>
                {predictions.map((prediction, key) => (
                    <ListItem key={key} disablePadding secondaryAction={
                        <Button href={PATH.PREDICTION(prediction.id)}>Detail</Button>
                    } className={"hover:bg-gray-200 p-2"}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary={prediction.disease_name} secondary={prediction.created_at} />
                    </ListItem>
                ))}
            </List>
            <Pagination count={10} className="w-max mx-auto mt-5" />
        </>
    )
}

export default ListPredictions