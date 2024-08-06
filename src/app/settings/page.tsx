import type { NextPage } from "next";
import PageTitle from "@/components/PageTitle/PageTitle";
import { Button, FormControlLabel, Grid, Switch, TextField } from "@mui/material";

const Settings: NextPage = () => {
    return (
        <>
            <PageTitle title={"Settings"} />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                name="darkMode"
                                color="primary"
                            />
                        }
                        label="Dark Mode"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                name="notifications"
                                color="primary"
                            />
                        }
                        label="Enable Notifications"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary">
                        Save Changes
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Settings;
