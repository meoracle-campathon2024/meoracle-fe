import { PATH } from "@/config/path";
import { Button ,List, ListItem, ListItemIcon, ListItemText, Pagination } from "@mui/material";
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import { Disease } from "@/interfaces/Disease";

const ListDieases = ({dieases}: {dieases: Disease[]}) => {
    if(!dieases.length) {
        return
    }

    return (
        <div className="mt-5">
            <h1 className="font-bold">TOP DISEASES</h1>
            <List>
                {dieases.map((diease, key) => (
                    <ListItem key={key} disablePadding secondaryAction={
                        <Button href={PATH.DISEASE(diease.id)}>Detail</Button>
                    } className={"hover:bg-gray-200 p-2"}>
                        <ListItemIcon>
                            <CoronavirusIcon />
                        </ListItemIcon>
                        <ListItemText primary={diease.disease_name} secondary={diease.created_at} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default ListDieases