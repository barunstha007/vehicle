import React, { useState, useEffect } from 'react'
import { MdModeEdit, MdDelete, MdCancel } from 'react-icons/md'
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux'
import { getBikeModellist, addbikeModel, deletebikeModel, updatebikeModel } from '../../redux/actions/bikeModel'
import Alert from '../../layout/Alert'

function BikeModel(props) {

    const title = ['S.N', 'Bike Model', 'Total Users', 'Actions']

    // Create input change
    const [state, setState] = useState({
        id: "",
        bikeModel: "",
        totalUsers: "",

        updateToggle: false,
    })

    useEffect(() => {
        props.getBikeModellist()

    }, [])

    // input onchange handler
    const onChangeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const addHandler = () => {

        const bikeModel = {
            bikeModel: state.bikeModel
        }

        // Create bikeModel
        props.addbikeModel(bikeModel)

        setState({
            bikeModel: "",
        })
    }
    const updateHandler = (data) => {
        setState({
            id: data._id,
            bikeModel: data.bikeModel,

            updateToggle: true,
        })

    }
    const updateCancelHandler = () => {
        setState({
            ...state,
            bikeModel: "",

            updateToggle: false,
        })
    }
    const deleteHandler = bikeModelID => {
        // console.log(bikeModel)
        var confirm = window.confirm('Are you sure you want to delete this Bike Model? This deletion is irriversible')
        if (confirm) {
            return props.deletebikeModel(bikeModelID)
        }
    }
    const submitUpdate = () => {

        const bikeModelDetails = {
            id: state.id,
            bikeModel: state.bikeModel,
        }

        props.updatebikeModel(bikeModelDetails)

        // reset state
        setState({

            id: "",
            bikeModel: "",

            updateToggle: false
        })
    }

    // CHECK Create or Update and Cancle button
    const createOrUpdateBtn = (state) => {
        if (state.updateToggle)
            return (
                <React.Fragment>
                    <button
                        type="button"
                        className="btn btn-primary btn-rounded btn-sm my-0 mx-1"
                        onClick={submitUpdate}><MdModeEdit /></button>

                    <button
                        type="button"
                        className="btn btn-danger btn-rounded btn-sm my-0"
                        onClick={updateCancelHandler}><MdCancel /></button>
                </React.Fragment>
            )
        else
            return (
                <button type="button"
                    className="btn btn-success btn-rounded my-0 mx-1"
                    onClick={addHandler}>Create</button>
            )
    }

    const getbikeModellist = props.bikeModellist.map((bikeModel, index) => {
        return (
            <tr key={index}>
                <td className="pt-3-half" >{index + 1}</td>
                <td className="pt-3-half" name="name">{bikeModel.bikeModel}</td>
                <td className="pt-3-half" name="location">{bikeModel.totalusers}</td>
                <td>
                    <span className="table-remove">
                        {/* Update */}
                        <button
                            type="button"
                            className="btn btn-primary btn-rounded btn-sm my-0 mx-1"
                            onClick={() => updateHandler(bikeModel)}><MdModeEdit /></button>

                        <button
                            type="button"
                            className="btn btn-danger btn-rounded btn-sm my-0"
                            onClick={() => deleteHandler(bikeModel)}><MdDelete /></button>
                    </span>
                </td>
            </tr>
        )
    })

    return (
        <div className="card">
            {/* Title */}
            <span className="badge badge-info">
                <h3 className="card-header text-center font-weight-bold text-uppercase py-4">Bike Model</h3>
            </span>
            <div className="card-body">
                <div id="table" className="table-editable">
                    <span className="table-add float-right mb-3 mr-2"><a href="#!" className="text-success"><i
                        className="fas fa-plus fa-2x" aria-hidden="true"></i></a></span>
                    <Alert />
                    <table className="table table-bordered table-responsive-md table-striped text-center">
                        {/* Table Headers */}
                        <thead>
                            <tr>
                                {title.map((title, index) => {
                                    return (
                                        <th key={index} className="text-center text-white bg-secondary">{title}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Create Bike Model */}
                            <tr>
                                <td>#</td>
                                <td><input
                                    name="bikeModel"
                                    type="text"
                                    className="form-control"
                                    placeholder="Bike Model"
                                    value={state.bikeModel}
                                    onChange={onChangeHandler} />

                                </td>
                                <td><input
                                    disabled
                                    className="form-control" />
                                </td>

                                <td>
                                    {/* Create or Update button based on state.updateToogle condition */}
                                    {createOrUpdateBtn(state)}
                                </td>
                            </tr>

                            {/* If update clicked then turn off list */}
                            {state.updateToggle ? null : getbikeModellist}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

BikeModel.propTypes = {
    getBikeModellist: PropTypes.func.isRequired,
    // addbikeModel: PropTypes.func.isRequired,
    // updateBikeModel: PropTypes.func.isRequired,
    // deletebikeModel: PropTypes.func.isRequired,
}

const mapToStateToProps = state => ({
    bikeModellist: state.bikeModel.bikeModellist
})

export default connect(mapToStateToProps,
    { getBikeModellist, addbikeModel, deletebikeModel, updatebikeModel })
    (BikeModel)
