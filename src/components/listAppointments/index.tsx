import { PATH } from "@/config/path"
import { Button, List, ListItem, ListItemIcon, ListItemText, Pagination } from "@mui/material"
import FeedIcon from '@mui/icons-material/Feed';
import { Appointment } from "@/interfaces/Appointment";

const ListAppointMents = ({ appointments = [] }: { appointments: Appointment[] }) => {
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
            <Pagination count={2} className="w-max mx-auto mt-5" />
        </>

    )
}

export default ListAppointMents