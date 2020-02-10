import React, { useState, useEffect } from 'react'
import { Redirect, browserHistory } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { TextField, Button, FormControl, InputLabel, Select } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

// Redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { getBikeModellist } from '../redux/actions/bikeModel'
import { getUserBike, addOrUpdatebike } from '../redux/actions/userBike'
import Alert from "../layout/Alert";
import setAuthToken from "../utils/setAuthToken";

function BikeForm(props) {

    const [state, setstate] = useState(props.userBike);

    useEffect(() => {
        props.getUserBike()
        props.getBikeModellist()

        // console.log(props.getUserBike())
        // !props.bikeloading && 
        setstate({
            ...state,
            bikeModel: props.userBike.bikeModel,
            bikeNumber: props.userBike.bikeNumber,
            odometer: props.userBike.odometer,
        })

    }, [])

    const onSubmitHandler = e => {
        e.preventDefault()

        const bikeDetails = {
            bikeModel: state.bikeModel,
            bikeNumber: state.bikeNumber,
            odometer: state.odometer,
        }

        // console.log(bikeDetails)
        props.addOrUpdatebike(bikeDetails)

    }

    const onChangeHandler = e => {
        setstate({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const bikeModelList = props.bikeModellist.map((bike, index) => {
        return (
            <option key={index} value={bike._id}>{bike.bikeModel}</option>
        )
    })

    // // IF not AUTHENTICATED
    if (!props.authloading && !props.isAuthenticated) return (<Redirect to="/login" />)


    return (
        <React.Fragment>
            <Alert />
            <form onSubmit={onSubmitHandler}>
                {/* Dropdown */}
                <FormControl variant="outlined"
                    className={props.classes.form}>

                    <Select
                        native
                        // value={state.bikeModel}
                        onChange={e => setstate({ ...state, bikeModel: e.target.value })}
                        defaultValue={'DEFAULT'}>
                        <option value='DEFAULT'>--Bike Model--</option>
                        {bikeModelList}
                    </Select>
                </FormControl>

                {/* Bike Number */}
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="bikeNumber"
                    label="Bike Number (Ba 66 pa 3080)"
                    autoComplete="bikeNumber"
                    autoFocus
                    value={state.bikeNumber}
                    onChange={onChangeHandler}
                />
                <TextField
                    variant="outlined"
                    margin="normal"

                    fullWidth
                    label="Odometer (km)"
                    type="number"
                    name="odometer"
                    value={state.odometer}
                    onChange={onChangeHandler}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={props.classes.submit}
                >
                    Submit
                </Button>

            </form >
        </React.Fragment >
    )
}

BikeForm.propTypes = {
    getBikeModellist: PropTypes.func.isRequired,
    getUserBike: PropTypes.func.isRequired,
    addOrUpdatebike: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    requestedStatus: PropTypes.bool
}

const mapStateToProps = state => ({
    bikeModellist: state.bikeModel.bikeModellist,
    userBike: state.userBike.userBike,
    requestedStatus: state.userBike.requestedStatus,
    isAuthenticated: state.auth.isAuthenticated,
    authloading: state.auth.loading,
    bikeloading: state.userBike.loading
})
export default connect(mapStateToProps, {
    getBikeModellist,
    getUserBike, addOrUpdatebike
})
    (BikeForm)