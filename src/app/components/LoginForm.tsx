import { Box, Button, Container, FormGroup, TextField } from "@material-ui/core"
import { useState } from "react"

import Kisi from '../KisiWrapper';


export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const doLogin = async (email: string, password: string) => {
        try {
            const login = await Kisi.login(email, password);
            console.log(login);
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
        </Container>
    )
}