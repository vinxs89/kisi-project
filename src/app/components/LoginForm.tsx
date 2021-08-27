import { Box, Button, Container, FormGroup, TextField } from "@material-ui/core"
import { useState } from "react"

import Kisi from '../KisiWrapper';
import { Lock } from "../Types";
import { EventsLog } from "./EventsLog";
import { Locks } from "./Locks";

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [locks, updateLocks] = useState([] as unknown as Lock[]);
    const [events, updateEvents] = useState([]);

    const doLogin = async (email: string, password: string) => {
        try {
            const login = await Kisi.login(email, password);
            console.log(login);
    
            const places = await Kisi.getPlaces();
            console.log(places);
    
            const locks = await Kisi.getLocks(places.data[0].id);
            console.log(locks);
            updateLocks(locks.data);

            /*
            try {
                const response = await Kisi.unlock(locks.data[1].id);
                console.log(response);
            } catch(e) {
                console.error(e);
            }
            */

            const unlockEvents = await Kisi.getUnlockEvents(places.data[0].id, login.user.id);
            console.log(unlockEvents);
            updateEvents(unlockEvents);
    
            const { failure, success } = unlockEvents.reduce((acc: { failure: any[], success: any[]}, ev: any) => {
                ev.success ? acc.success.push(ev) : acc.failure.push(ev);
                return acc;
            }, { failure: [], success: []});
    
            console.log("success events");
            console.log(success);
    
            console.log("failure events");
            console.log(failure);
        } catch(e) {
            console.error(e);
        }
    
    }

    return (
        <Container>
            <Box component="form">
                <FormGroup>
                    <TextField required label="Email" value={email} variant="outlined" onChange={(e) => setEmail(e.currentTarget.value)}/>
                    <TextField required label="Password" value={password} type="password" variant="outlined" onChange={(e) => setPassword(e.currentTarget.value)} />
                    <Button onClick={() => doLogin(email, password)} color="primary">Submit</Button>
                </FormGroup>
            </Box>

            <Locks locks={locks} />
            <EventsLog events={events} />
        </Container>
    )
}