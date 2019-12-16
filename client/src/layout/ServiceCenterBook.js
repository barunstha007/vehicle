import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'

// Redux
import { connect } from 'react-redux'
import { serviceCenterList } from '../redux/actions/serviceCenterList'

function ServiceCenterBook(props) {

    const [state, setState] = useState({
        selectedValue: null
    })

    useEffect(() => {
        // get servicecenters (in action)
        props.serviceCenterList()

        // Set initial select value from reducer
        setState({
            selectedValue: props.initialSelect
        })

    }, [props.sclists.length])


    // map state to select options
    const serviceLocation = props.sclists.map((sclist, index) => {
        return (
            <option key={index} value={sclist._id} > {sclist.name}, {sclist.serviceLocation}</option>
        )
    })

    const bookHandler = e => {

        e.preventDefault()
        console.log(state.selectedValue)
        // if (props.isAuthenticated)
        // else
        //     return <Redirect to='register' />

    }

    return (
        <form className="form-group row container" onSubmit={bookHandler}>
            <select
                className="form-control"
                style={{ width: '18em ' }}
                onChange={e => setState({ ...state, selectedValue: e.target.value })}>
                {serviceLocation}
            </select>
            <button className="btn btn-primary mx-1" type="submit" >Book</button>
        </form>
    )
}

ServiceCenterBook.propTypes = {
    serviceCenterList: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    sclists: state.serviceCenterList.sclist,
    initialSelect: state.serviceCenterList.initialSelect,
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapStateToProps, { serviceCenterList })(ServiceCenterBook)