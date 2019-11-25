import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { Alert } from 'react-datepicker'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();

    const [state, setstate] = useState({
        name: '',
        phone: '',
        email: '',
        location: '',
        username: '',
        password: '',
        errors: []
    })
    const onChangeName = e => {
        setstate({
            ...state, name: e.target.value
        })
    }

    const onChangePhone = e => {
        setstate({
            ...state, phone: e.target.value
        })
    }

    const onChangeEmail = e => {
        setstate({
            ...state, email: e.target.value
        })
    }

    const onChangeLocation = e => {
        setstate({
            ...state, location: e.target.value
        })
    }

    const onChangeUsername = e => {
        setstate({
            ...state, username: e.target.value
        })
    }


    const onChangePassword = e => {
        setstate({
            ...state, password: e.target.value
        })
    }

    const onSubmitHandler = e => {
        const register = {
            name: state.name,
            phone: state.phone,
            email: state.email,
            location: state.location,
            username: state.username,
            password: state.password
        }

        axios.post('/register', register)
            .then(req => console.log(req.data))
            .catch(err => {
                const errors = [...err.response.data.error]

                setstate({ ...state, errors: { ...err.response.data.error } })
                // err.response.data.error.map(error)
                console.log(state.errors[0])
            })

        console.log(register)

        setstate({
            name: '', phone: '', email: '', location: '', username: '', password: ''
        })
        e.preventDefault()
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>

                <form className={classes.form} onSubmit={onSubmitHandler}>
                    {/* Alert */}
                    <div className="alert alert-primary invisible" role="alert">
                        {state.errors[0]}
                    </div>
                    {/* Input Fields */}
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                value={state.name}
                                onChange={onChangeName}
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={state.phone}
                                onChange={onChangePhone}
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                label="Phone"
                                name="phone"
                                autoComplete="phone"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={state.email}
                                onChange={onChangeEmail}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={state.location}
                                onChange={onChangeLocation}
                                variant="outlined"
                                required
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
                                value={state.username}
                                onChange={onChangeUsername}
                                variant="outlined"
                                required
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
                                onChange={onChangePassword}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid> */}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
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
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}