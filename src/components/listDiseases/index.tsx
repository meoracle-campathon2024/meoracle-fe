import { PATH } from "@/config/path";
import { Button, CircularProgress, List, ListItem, ListItemIcon, ListItemText, Pagination } from "@mui/material";
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import { Disease } from "@/interfaces/Disease";

const ListDieases = ({ dieases, loading }: { dieases: Disease[]}) => {
    if (!dieases.length) {
        return
    }

    return (
        <div className="mt-5">
            <div className="flex justify-between justify-items-center">
                <h1 className="font-bold">TOP DISEASES</h1>
                <Button href={PATH.MAKE_APPOINTMENT(dieases.id)}>MAKE APPOINTMENT</Button>
            </div>

            <List>
                {dieases.map((diease, key) => (
                    <ListItem key={key} disablePadding className={"hover:bg-gray-200 p-2"}>
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