import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { TextField, Button, FormControl, InputLabel, Select } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

// Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { login } from '../redux/actions/auth'
import Alert from "../layout/Alert";

function BikeForm(props) {
    // Custom functions
    const [state, setstate] = useState({
        bikeModel: "",
        bikeNumber: "",
        odo: "",

    });

    const onSubmitHandler = e => {
        e.preventDefault()

        const bikeDetails = {
            bikeModel: state.bikeModel,
            bikeNumber: state.bikeNumber,
            odo: state.odo,
        }


        props.login(bikeDetails)
    }

    // // IF AUTHENTICATED
    // if (props.isAuthenticated) return <Redirect to="profile" />

    const onChangeHandler = e => {
        // Spread operator because hooks replace the whole object
        // so copying the old object
        setstate({ ...state, [e.target.id]: e.target.value });
    };


    // MATERIAL UI
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(100);

    return (
        <React.Fragment>
            <Alert />
            <form onSubmit={onSubmitHandler}>
                {/* Dropdown */}
                <FormControl variant="outlined"
                    className={props.classes.form}
                >
                    <InputLabel
                        ref={inputLabel}
                        htmlFor="outlined-age-native-simple">
                        Age
        </InputLabel>
                    <Select
                        native
                        value={state.age}
                        // onChange={handleChange('age')}
                        labelWidth={labelWidth}
                        inputProps={{
                            name: 'age',
                            id: 'outlined-age-native-simple',
                        }}
                        defaultValue="DEFAULT"
                    >
                        <option value="DEFAULT" disabled>--Select Model--</option>
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </Select>
                </FormControl>

                {/* Text */}
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
            </form >
        </React.Fragment >



    )
}

BikeForm.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    authStatus: state.auth.authStatus
})
export default connect(mapStateToProps, { login })(BikeForm)