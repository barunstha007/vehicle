import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom'
// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from './Alert';
import { register } from '../redux/actions/auth'

function RegistrationForm(props) {

    const [state, setstate] = useState({
        name: '',
        phone: '',
        email: '',
        location: '',
        username: '',
        password: '',
        cpassword: '',
    })

    const onChangeHandler = e => {
        setstate({
            ...state, [e.target.id]: e.target.value
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault()

        const register = {
            name: state.name,
            phone: state.phone,
            email: state.email,
            location: state.location,
            username: state.username,
            password: state.password,
            cpassword: state.cpassword
        }

        if (register.password !== register.cpassword) {
            props.setAlert('Passwords do not match !', 'danger')
        }
        // send data to register action
        props.register(register)
        // console.log('Register Success')
    }

    if (props.isAuthenticated) return <Redirect to="/bike" />

    // else console.log('Not Authenticated')
    // return <Redirect to="profile" />



    return (
        <React.Fragment>
            <Alert />
            <form className={props.classes.form} onSubmit={onSubmitHandler}>

                {/* Input Fields */}
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            value={state.name}
                            onChange={onChangeHandler}
                            autoComplete="name"
                            name="name"
                            variant="outlined"
                            // required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={state.phone}
                            onChange={onChangeHandler}
                            variant="outlined"
                            // required
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                            autoComplete="phone"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={state.location}
                            onChange={onChangeHandler}
                            variant="outlined"
                            // required
                            fullWidth
                            name="location"
                            label="Location"
                            type="location"
                            id="location"
                            autoComplete="location"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={state.email}
                            onChange={onChangeHandler}
                            variant="outlined"
                            // required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={state.username}
                            onChange={onChangeHandler}
                            variant="outlined"
                            // required
                            fullWidth
                            name="username"
                            label="Username"
                            type="username"
                            id="username"
                            autoComplete="username"
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={state.password}
                            onChange={onChangeHandler}
                            variant="outlined"
                            // required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={state.cpassword}
                            onChange={onChangeHandler}
                            variant="outlined"
                            // required
                            fullWidth
                            name="cpassword"
                            label="Confirm Password"
                            type="password"
                            id="cpassword"
                            autoComplete="current-password"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={props.classes.submit}
                >
                    Sign Up
          </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            Already have an account? Sign in
              </Link>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    )
}

RegistrationForm.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    authStatus: state.auth.authStatus
})

export default connect(mapStateToProps, { register })(RegistrationForm)