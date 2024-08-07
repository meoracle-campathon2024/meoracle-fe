import { PATH } from "@/config/path";
import { Button, CircularProgress, List, ListItem, ListItemIcon, ListItemText, Pagination } from "@mui/material";
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import { Disease } from "@/interfaces/Disease";
import { QueryDetail } from "@/interfaces/QueryDetail";
import { Ref, useEffect, useRef } from "react";

const ListDieases = ({ dieases, queryDetail }: { dieases: Disease[], queryDetail: QueryDetail|null }) => {
    if (!dieases.length || null === queryDetail) {
        return <></>;
    }

    const diseaseListRef = useRef<HTMLDivElement|null>(null);

    useEffect(() => {
        if (dieases.length > 0) {
            if (diseaseListRef && diseaseListRef.current) {
                diseaseListRef.current.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        }
    }, [dieases]);

    return (
        <div className="mt-5">
            <div className="flex justify-between justify-items-center">
                <h1 className="font-bold">TOP DISEASES</h1>
                <Button href={PATH.MAKE_APPOINTMENT()}>MAKE APPOINTMENT</Button>
            </div>

            <div ref={diseaseListRef}>
                <List>
                    {dieases.map((diease, key) => (
                        <ListItem key={key} disablePadding className={"hover:bg-gray-200 p-2"}>
                            <ListItemIcon>
                                <CoronavirusIcon />
                            </ListItemIcon>
                            <ListItemText primary={diease.disease_name}/>
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    )
}

export default ListDieases