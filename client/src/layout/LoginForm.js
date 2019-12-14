import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

// Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { login } from '../redux/actions/auth'
import Alert from "../layout/Alert";

function LoginForm(props) {
    // Custom functions
    const [state, setstate] = useState({
        username: "",
        password: ""

    });

    const onSubmitHandler = e => {
        e.preventDefault()

        const loginDetails = {
            username: state.username,
            password: state.password
        }


        props.login(loginDetails)

        // setstate({
        //   name: '', phone: '', email: '', location: '', username: '', password: ''
        // })
    }

    // IF AUTHENTICATED
    if (props.isAuthenticated) return <Redirect to="profile" />

    const onChangeHandler = e => {
        // Spread operator because hooks replace the whole object
        // so copying the old object
        setstate({ ...state, [e.target.id]: e.target.value });
    };


    return (
        <React.Fragment>
            <Alert />
            <form onSubmit={onSubmitHandler}>
                <TextField
                    variant="outlined"
                    margin="normal"

                    fullWidth
                    id="username"
                    label="Username"
                    autoComplete="username"
                    autoFocus
                    value={state.username}
                    onChange={onChangeHandler}
                />
                <TextField
                    variant="outlined"
                    margin="normal"

                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={state.password}
                    onChange={onChangeHandler}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={props.classes.submit}
                >
                    Sign In
          </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
              </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    )
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    authStatus: state.auth.authStatus
})
export default connect(mapStateToProps, { login })(LoginForm)