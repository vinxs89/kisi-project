import { Box, Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { EventsLog } from "../components/EventsLog";
import { Locks } from "../components/Locks";
import { Lock, Place, PlacePagination } from "../Types";
import Kisi from '../KisiWrapper';
import { PlaceSelector } from "../components/PlaceSelector";
import { EventsHistogram } from "../components/EventsHistogram";

export const Main = () => {
    const [placePagination, updatePlacePagination] = useState(null as unknown as PlacePagination);
    const [locks, updateLocks] = useState(null as unknown as Lock[] | null | 'Loading');
    const [events, updateEvents] = useState(null as unknown as any | null | 'Loading') ;
    const [selectedPlace, updateSelectedPlace] = useState(null as unknown as Place);

    useEffect(() => {
        Kisi.getPlaces()
            .then(updatePlacePagination)
            .catch(console.error);
        /*
        try {
            const response = await Kisi.unlock(locks.data[1].id);
            console.log(response);
        } catch(e) {
            console.error(e);
        }
        */
    }, []);

    useEffect(() => {
        if(!selectedPlace) {
            return;
        }

        updateLocks('Loading');
        updateEvents('Loading');
        Kisi.getLocks(selectedPlace.id)
            .then(pagination => {
                updateLocks(pagination.data);
            })
            .catch(console.error);
        
        let intervalId = setInterval(() => {
            Kisi.getUnlockEvents(selectedPlace.id, '66949991')
                .then(updateEvents)
                .catch(console.error);
        }, 5000);

        return () => {
            clearInterval(intervalId);
        }
    }, [selectedPlace]);

    return (
        <Container>
            <h4>Places</h4>
            <Box border='1px solid #ccc' padding='20px' marginTop='20px'>
                <PlaceSelector placePagination={placePagination} handleSelectedPlace={updateSelectedPlace} />
            </Box>

            <h4>Locks</h4>
            <Box marginTop='20px'>
                <Locks locks={locks} />
            </Box>

            <h4>Events</h4>
            <Box marginTop='20px'>
                <EventsHistogram events={events} />
                <EventsLog events={events} />
            </Box>
        </Container>
    )
}