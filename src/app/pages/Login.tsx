import { Grid } from "@material-ui/core"
import { LoginForm } from "../components/LoginForm"
import { Main } from "./Main"

export const Login = () => {
    return (
        <Grid container justify="center">
            <LoginForm />
        </Grid>
    )
}