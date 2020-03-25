import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom'

// Redux
import store from '../redux/store'
import { connect } from 'react-redux'
import { serviceCenterList } from '../redux/actions/serviceCenterList'
import { getUserBike } from '../redux/actions/userBike'
import { bookServicing } from '../redux/actions/booking'
import { setAlert } from '../redux/actions/alert'



function ServiceCenterBook(props) {

    const [state, setState] = useState({
        selectedServiceCenter: null,
        buttonDisabled: false
    })

    useEffect(() => {
        props.serviceCenterList()
        props.getUserBike()

    }, [])


    // map state to select options
    const serviceLocation = props.sclists.map((sclist, index) => {
        return (
            <option key={index} value={sclist._id} className={sclist.bookingCount < sclist.bookingLimit ? 'bg-success text-white ' : 'bg-danger text-white'}> {sclist.name}, {sclist.serviceLocation}</option >
        )
    })

    const bookHandler = e => {
        e.preventDefault()

        // if (!props.isAuthenticated) store.dispatch(setAlert('Please login to book', 'danger'))

        {
            !props.isloading && setState({
                ...state,
                buttonDisabled: true
            })
        }


        props.bookServicing(state.selectedServiceCenter, props.userBike._id, 1)
    }

    return (
        <form className="form-group row container" onSubmit={bookHandler}>
            <select
                className="form-control"
                style={{ width: '17em ' }}
                defaultValue={'DEFAULT'}
                onChange={e => setState({ ...state, selectedServiceCenter: e.target.value })}>
                <option value="DEFAULT" disabled className="bg-secondary text-white">--Book Servicing--</option>
                {serviceLocation}
            </select>
            <button className="btn btn-primary ml-1" type="submit" disabled={state.buttonDisabled} >Book</button>
        </form>
    )
}

ServiceCenterBook.propTypes = {
    serviceCenterList: PropTypes.func.isRequired,
    getUserBike: PropTypes.func.isRequired,
    bookServicing: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    sclists: state.serviceCenterList.sclist,
    userBike: state.userBike.userBike,
    isloading: state.booking.loading,
    isAuthenticated: state.auth.isAuthenticated

})

export default connect(mapStateToProps, { serviceCenterList, getUserBike, bookServicing })(ServiceCenterBook)