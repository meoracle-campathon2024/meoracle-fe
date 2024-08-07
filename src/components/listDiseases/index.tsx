import { PATH } from "@/config/path";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material";
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import { Disease } from "@/interfaces/Disease";
import { QueryDetail } from "@/interfaces/QueryDetail";
import { Key, useCallback, useEffect, useRef, useState } from "react";
import { getAppointmentSuggestions, getCountries, getDivisions } from "@/utils/backend";
import { Coordinates } from "@/interfaces/Coordinates";
import { Country } from "@/interfaces/Country";
import { Division } from "@/interfaces/Division";

function DivisionSelectInput({ division, setLocation }: {
    division: Division,
    setLocation: (loc: Coordinates|null) => any,
}) {
    const [selectedSubdivision, setSelectedSubdivision] = useState(null as Division | null);

    const onSubdivisionIdChange = useCallback((event: SelectChangeEvent) => {
        const selectedSubdivisionId = +event.target.value;
        const selectedSubdivisionList = division.children.filter(c => c.id === selectedSubdivisionId);
        if (selectedSubdivisionList.length === 0) {
            return; // ignore ; this error may never occur
        }
        const selectedSubdivision = selectedSubdivisionList[0];
        setSelectedSubdivision(selectedSubdivision);
        if (selectedSubdivision.children.length === 0) {
            const { lat, lon } = division;
            setLocation({ lat, lon });
        }
    }, [setSelectedSubdivision, division, setLocation]);

    useEffect(() => {
        if (division.children.length === 0) {
            const { lat, lon } = division;
            setLocation({ lat, lon });
        }
    }, [division, setLocation]);

    return <>
        {
            division.children.length === 0
                ? <></>
                : <>
                    <Select onChange={onSubdivisionIdChange}>
                        {division.children.map((subdivision, key) => (
                            <MenuItem key={key} value={subdivision.id}>
                                {subdivision.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {
                        null === selectedSubdivision
                            ? <></>
                            : <DivisionSelectInput division={selectedSubdivision} setLocation={setLocation} />
                    }
                </>
        }
    </>;
}

function DivisionSelector({ divisions, setLocation }: {
    divisions: Division[],
    setLocation: (loc: Coordinates|null) => any,
}) {
    return <>{
        // usually there should be only 1 top division!
        divisions.map((d, key) => {
            return <>
                <DivisionSelectInput key={key} division={d} setLocation={setLocation} />
            </>;
        })
    }</>
}

function ManualLocationInputForm({ setLocationAndFinish, cancelAndFinish }: {
    setLocationAndFinish: (loc: Coordinates) => any,
    cancelAndFinish: () => any,
}) {
    const [countries, setCountries] = useState([] as Country[]);
    const [currentCountryId, setCurrentCountryId] = useState(null as number | null);
    const [divisions, setDivisions] = useState([] as Division[]);
    const [location, setLocation] = useState(null as Coordinates | null);

    const [isComplainDialogOpen, setIsComplainDialogOpen] = useState(false);

    useEffect(() => {
        getCountries().then(countries => setCountries(countries));
    }, []);

    const handleCountryChange = useCallback((event: SelectChangeEvent) => {
        const countryId = +event.target.value;

        setCurrentCountryId(countryId);
        setDivisions([]);

        getDivisions({ countryId }).then(divisions => setDivisions(divisions));
    }, [setCurrentCountryId]);

    const onOKButtonPressed = useCallback(() => {
        if (null === location) {
            setIsComplainDialogOpen(true);
        } else {
            setLocationAndFinish(location);
        }
    }, [setLocationAndFinish, location, setIsComplainDialogOpen]);

    return <FormControl>
        <Select onChange={handleCountryChange}>
            {countries.map((country, key) => {
                return <MenuItem key={key} value={country.id}>{country.short_name}</MenuItem>
            })}
        </Select>

        <DivisionSelector divisions={divisions} setLocation={setLocation} />

        <Button variant="contained" onClick={onOKButtonPressed}>OK</Button>
        <Button onClick={cancelAndFinish}>Cancel</Button>

        <Dialog open={isComplainDialogOpen}>
            <DialogTitle>{"You haven't filled in enough information"}</DialogTitle>
            <DialogContent>{"Please fill in any missing field(s)."}</DialogContent>
            <DialogActions>
                <Button onClick={() => setIsComplainDialogOpen(false)}>OK</Button>
            </DialogActions>
        </Dialog>
    </FormControl>;
}

function AskLocationDialog({ open, handleClose, location, setLocation }: {
    open: boolean,
    handleClose: () => any,
    location: Coordinates | null,
    setLocation: (loc: Coordinates | null) => any,
}) {
    const [manual, setManual] = useState(false);

    useEffect(() => {
        if (open) {
            setManual(false);
        }
    }, [open]);

    const [locationBlocked, setLocationBlocked] = useState(false);

    const readLocationAuto = useCallback(async () => {
        setLocationBlocked(false);

        await new Promise(resolve => setTimeout(() => resolve(null), 500));

        navigator.geolocation.getCurrentPosition(
            pos => {
                setLocation({
                    lat: pos.coords.latitude,
                    lon: pos.coords.longitude,
                });

                handleClose();
            },

            err => {
                setLocationBlocked(true);
                console.log(err);
            },
        );
    }, [setLocationBlocked, handleClose, setLocation]);

    return <>{
        manual
            ? <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Please enter your Location</DialogTitle>
                <DialogContent>
                    <Button onClick={() => {
                        setManual(false);
                        readLocationAuto();
                    }}>{"Automatically read my location"}</Button>
                    <Divider />

                    <FormControl sx={{ m: 1, width: 300, gap: 4, rowGap: 4 }}>
                        <ManualLocationInputForm
                            setLocationAndFinish={(loc) => {
                                setLocation(loc);
                                handleClose();
                            }}
                            cancelAndFinish={() => {
                                setLocation(null);
                                handleClose();
                            }}
                        />
                    </FormControl>

                </DialogContent>
            </Dialog>

            : <>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Please enable us to read your Location!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>That will help us search for the nearest relevant hospitals for your appointment!</DialogContentText>
                        <DialogContentText>{"If you don't share your location, the results might appear inaccurate, e.g. the hospitals are too far away from your actual location."}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" autoFocus onClick={() => readLocationAuto()}>{"Yes, read my location automatically!"}</Button>
                        <Button variant="text" onClick={() => setManual(true)}>{"No, I prefer to enter my location manually"}</Button>
                        <Button variant="text" onClick={() => handleClose()}>{"No, I don't want to share my location"}</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={open && locationBlocked && !manual} onClose={() => setManual(true)}>
                    <DialogTitle>{"Well, you blocked me from reading the location :("}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{"Please re-enable Location permission for us in your browser settings."}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus variant="contained" onClick={() => readLocationAuto()}>{"I've done that, try again!"}</Button>
                        <Button onClick={() => setManual(true)}>{"No, I prefer to enter my location manually"}</Button>
                    </DialogActions>
                </Dialog>
            </>
    }</>;
}

function AppointmentSuggestionsDialog({ open, handleClose, queryDetail }: {
    open: boolean,
    handleClose: () => any,
    queryDetail: QueryDetail | null,
}) {
    const [appointmentSuggestions, setAppointmentSuggestions] = useState([] as AppointmentSuggestion[]);

    const [locationDialogOpen, setLocationDialogOpen] = useState(false);
    const [location, setLocation] = useState(null as Coordinates | null);
    const [startQuerySuggestions, setStartQuerySuggestions] = useState(false);

    useEffect(() => {
        if (open) {
            setAppointmentSuggestions([]);
            setStartQuerySuggestions(false);
            setLocation(null);
            setLocationDialogOpen(true);
        }
    }, [open]);

    useEffect(() => {
        if (null === queryDetail) return;
        if (startQuerySuggestions) {
            getAppointmentSuggestions(queryDetail, location)
                .then(suggestions => setAppointmentSuggestions(suggestions))
                .finally(() => setStartQuerySuggestions(false));
        }
    }, [queryDetail, startQuerySuggestions, location]);

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Suggestions for Making Appointment</DialogTitle>
                <List>
                    {
                        appointmentSuggestions.map((suggestion, key) => {
                            return <ListItem key={key}>
                                <ListItemButton>
                                    <ListItemText primary={suggestion.name} secondary={
                                        <>
                                            <p className="text-base text-black">{suggestion.hospital.name}</p>
                                            <p className="text-sm text-gray-500">{suggestion.specific_address + ", " + suggestion.hospital.full_address}</p>
                                        </>
                                    } />
                                </ListItemButton>
                            </ListItem>
                        })
                    }
                </List>
            </Dialog>

            <AskLocationDialog
                open={locationDialogOpen}
                handleClose={() => {
                    setLocationDialogOpen(false);
                    setStartQuerySuggestions(true);
                }}
                location={location}
                setLocation={setLocation}
            />
        </>
    );
}

const ListDieases = ({ dieases, queryDetail }: { dieases: Disease[], queryDetail: QueryDetail | null }) => {
    const diseaseListRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (dieases.length > 0) {
            if (diseaseListRef && diseaseListRef.current) {
                diseaseListRef.current.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        }
    }, [dieases]);


    const [isAppointmentSuggestionsDialogOpen, setIsAppointmentSuggestionsDialogOpen] = useState(false);

    const makeAppointment = useCallback(() => {
        setIsAppointmentSuggestionsDialogOpen(true);
    }, [setIsAppointmentSuggestionsDialogOpen]);

    return (
        !dieases.length || null === queryDetail
        ? <></>
        : <div className="mt-5">
            <div className="flex justify-between justify-items-center">
                <h1 className="font-bold">TOP DISEASES</h1>
                <Button onClick={() => makeAppointment()}>MAKE APPOINTMENT</Button>
            </div>

            <div ref={diseaseListRef}>
                <List>
                    {dieases.map((diease, key) => (
                        <ListItem key={key} disablePadding className={"hover:bg-gray-200 p-2"}>
                            <ListItemIcon>
                                <CoronavirusIcon />
                            </ListItemIcon>
                            <ListItemText primary={diease.disease_name} />
                        </ListItem>
                    ))}
                </List>
            </div>

            <AppointmentSuggestionsDialog
                open={isAppointmentSuggestionsDialogOpen}
                handleClose={() => setIsAppointmentSuggestionsDialogOpen(false)}
                queryDetail={queryDetail}
            />
        </div>
    )
}

export default ListDieases