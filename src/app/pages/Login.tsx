import { Container } from "@material-ui/core"
import { Grid, Box, Button, FormGroup, TextField } from "@material-ui/core"
import { useState } from "react"

import Kisi from '../KisiWrapper';

export const Login = () => {
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
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6} lg={4}>
                    <h4>Login</h4>
                    <Box component="form">
                        <FormGroup>
                            <TextField required label="Email" value={email} variant="outlined" onChange={(e) => setEmail(e.currentTarget.value)}/>
                            <TextField style={{marginTop: '20px'}} required label="Password" value={password} type="password" variant="outlined" onChange={(e) => setPassword(e.currentTarget.value)} />
                            <Button style={{marginTop: '20px'}} onClick={() => doLogin(email, password)} color="primary">Submit</Button>
                        </FormGroup>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}