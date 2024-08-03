import { PATH } from "@/config/path"
import { Button, List, ListItem, ListItemIcon, ListItemText, Pagination } from "@mui/material"
import FeedIcon from '@mui/icons-material/Feed';

const ListAppointMents = () => {
    const appointments = [
        {
            id: 11,
            created_at: "11/11/2011",
            department_name: "rang ham mat"
        },
        {
            id: 11,
            created_at: "11/11/2011",
            department_name: "rang ham mat"
        },
        {
            id: 11,
            created_at: "11/11/2011",
            department_name: "rang ham mat"
        },
    ]
    return (
        <>
            <h3>{appointments.length} appointments</h3>
            <List>
                {appointments.map((appointment, key) => (
                    <ListItem key={key} disablePadding secondaryAction={
                        <Button href={PATH.APPOINTMENT(appointment.id)}>Detail</Button>
                    } className={"hover:bg-gray-200 p-2"}>
                        <ListItemIcon>
                            <FeedIcon />
                        </ListItemIcon>
                        <ListItemText primary={appointment.department_name} secondary={appointment.created_at} />
                    </ListItem>
                ))}
            </List>
            <Pagination count={10} className="w-max mx-auto mt-5" />
        </>

    )
}

export default ListAppointMents