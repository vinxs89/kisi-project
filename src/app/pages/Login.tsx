import { Grid } from "@material-ui/core"
import { LoginForm } from "../components/LoginForm"

export const Login = () => {
    return (
        <Grid container justifyContent="center">
            <LoginForm />
        </Grid>
    )
}