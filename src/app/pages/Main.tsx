import { Box, Button, Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { EventsLog } from "../components/EventsLog";
import { Event, Lock, Place, PlacePagination, User } from "../Types";
import { PlaceSelector } from "../components/PlaceSelector";
import { EventsHistogram } from "../components/EventsHistogram";
import Kisi from '../KisiWrapper';
import { useStyles } from "../Styles";
import { Locks } from "../components/Locks";

type MainProps = {
    user: User;
}

export const Main = ({user}: MainProps) => {
    const classes = useStyles();
    const [placePagination, updatePlacePagination] = useState('Loading' as unknown as PlacePagination | 'Loading');
    const [locks, updateLocks] = useState(null as unknown as Lock[] | null | 'Loading');
    const [events, updateEvents] = useState(null as unknown as Event[] | null | 'Loading') ;
    const [selectedPlace, updateSelectedPlace] = useState(null as Place | null);

    useEffect(() => {
        refreshPlaces();
    }, [user]);

    useEffect(() => {
        if(!selectedPlace) {
            updateLocks(null);
            updateEvents(null);
        } else {
            refreshLocks(selectedPlace.id);
            refreshEvents(selectedPlace.id);
        }
    }, [selectedPlace]);

    const refreshPlaces = () => {
        updateSelectedPlace(null);
        updatePlacePagination('Loading');
        Kisi.getPlaces()
            .then(updatePlacePagination)
            .catch(console.error);
    }

    const refreshLocks = (placeId: string) => {
        updateLocks('Loading');
        Kisi.getLocks(placeId)
            .then(pagination => {
                updateLocks(pagination.data);
            })
            .catch(console.error);
    }

    const refreshEvents = (placeId: string) => {
        updateEvents('Loading');
        Kisi.getUnlockEvents(placeId, user.id)
            .then(updateEvents)
            .catch(console.error);
    }

    return (
        <Container>
            <Box className={classes.section__title}>
                <h4>Current User: {user.name}</h4>
                <Button onClick={() => Kisi.logout()}>Logout</Button>
            </Box>
            <Box className={classes.section__title}>
                <h4>Places</h4>
                <Button onClick={() => refreshPlaces()}>Refresh</Button>
            </Box>
            <Box className={classes.section__content}>
                {
                (placePagination === 'Loading') ? (<p>Loading...</p>)
                   : (placePagination.pagination.count === 0) ? (<p>No place to show, create one first</p>)
                   : <PlaceSelector placePagination={placePagination} selectedPlace={selectedPlace} handleSelectedPlace={updateSelectedPlace} />
                }
            </Box>

            <Box className={classes.section__title}>
                <h4>Locks</h4>
                { selectedPlace && <Button onClick={() => refreshLocks(selectedPlace.id)}>Refresh</Button> }
            </Box>
            <Box className={classes.section__content}>
                {
                   (locks === null) ? (<p>Select a place</p>)
                   : (locks === 'Loading') ? (<p>Loading...</p>)
                   : <Locks locks={locks} />
                }
            </Box>

            <Box className={classes.section__title}>
                <h4>Events</h4>
                { selectedPlace && <Button onClick={() => refreshEvents(selectedPlace.id)}>Refresh</Button> }
            </Box>
            <Box className={classes.section__content}>
                {
                   (events === null) ? (<p>Select a place</p>)
                   : (events === 'Loading') ? (<p>Loading...</p>)
                   : (
                       <Box>
                            <EventsHistogram events={events} bars={25} />
                            <EventsLog events={events} />
                       </Box>
                    )
                }
            </Box>
        </Container>
    )
}
