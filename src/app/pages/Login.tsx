import { Container, Snackbar } from "@material-ui/core"
import { Grid, Box, Button, FormGroup, TextField } from "@material-ui/core"
import { useState } from "react"

import Kisi from '../KisiWrapper';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, updateErrorMessage] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);

    const doLogin = async (email: string, password: string) => {
        try {
            const login = await Kisi.login(email, password);
            setShowSnackbar(false);
            updateErrorMessage("");
        } catch(e) {
            updateErrorMessage("Invalid credentials, try again");
            setShowSnackbar(true);
            console.error(e);
        }
    }

    return (
        <Container>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6} lg={4}>
                    <h4>Login</h4>
                    <form onSubmit={(e) => { doLogin(email, password); e.preventDefault(); }}>
                        <FormGroup>
                            <TextField required label="Email" value={email} variant="outlined" onChange={(e) => setEmail(e.currentTarget.value)}/>
                            <TextField style={{marginTop: '20px'}} required label="Password" value={password} type="password" variant="outlined" onChange={(e) => setPassword(e.currentTarget.value)} />
                            <Button type="submit" style={{marginTop: '20px'}} color="primary">Submit</Button>
                            <Snackbar
                                message={errorMessage}
                                open={showSnackbar}
                                onClose={() => setShowSnackbar(false)}
                                autoHideDuration={2000}
                            />
                        </FormGroup>
                    </form>
                </Grid>
            </Grid>
        </Container>
    )
}