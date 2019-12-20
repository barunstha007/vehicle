import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { MdModeEdit, MdDelete, MdCancel } from 'react-icons/md'
// Redux
import { connect } from 'react-redux'
import { serviceCenterList, addServiceCenter, deleteServiceCenter } from '../../redux/actions/serviceCenterList'
import { vacantAdminList, assignServiceCenter } from '../../redux/actions/admin'
import Alert from '../../layout/Alert'

function ServiceCenter(props) {

	const title = ['S.N', 'Location', 'Service Center Name', 'Admin', 'Booking Days', 'Booking Limit', 'Contact', 'Actions']

	// Create input change
	const [state, setState] = useState({
		name: "",
		serviceLocation: "",
		admin: "",
		maxBookingDays: "",
		bookingLimit: "",
		contact: "",

		updateToggle: false
	})


	useEffect(() => {
		props.serviceCenterList()
		props.vacantAdminList()

		// render after getting intial admin select 
		// PROPS VADMINLIST PROBLEM
	}, [props.sclists.length, props.vadminlist])


	// Create service center
	const addHandler = async e => {

		const createServiceCenter = {
			name: state.name,
			serviceLocation: state.serviceLocation,
			admin: state.admin,
			maxBookingDays: state.maxBookingDays,
			contact: state.contact,
			bookingLimit: state.bookingLimit
		}

		// Add service center
		props.addServiceCenter(createServiceCenter)

		setState({
			name: "",
			serviceLocation: "",
			admin: "",
			maxBookingDays: "",
			contact: "",
			bookingLimit: ""
		})

	}

	// Delete service center
	const deleteHandler = scID => {
		var confirm = window.confirm('Are you sure you want to delete this service center? This deletion is irriversible')
		if (confirm) {
			return props.deleteServiceCenter(scID)
		}

	}

	// input change handler
	const onChangeHandler = e => {
		setState({
			...state,
			[e.target.name]: e.target.value
		})
		// console.log(state)
	}

	//  set update chose fields to inputs
	const updateHandler = e => {
		// set admin assignServiceCenter
		props.assignServiceCenter(e.admin._id, 0)

		setState({
			...state,
			name: e.name,
			serviceLocation: e.serviceLocation,
			admin: e.admin._id,
			maxBookingDays: e.maxBookingDays,
			contact: e.contact,
			bookingLimit: e.bookingLimit,

			updateToggle: true
		})

		// props.vacantAdminList()

	}

	// Cancle update
	const updateCancelHandler = (e) => {

		// set admin assignServiceCenter
		props.assignServiceCenter(state.admin, 1)

		setState({
			name: "",
			serviceLocation: "",
			admin: "",
			maxBookingDays: "",
			contact: "",
			bookingLimit: "",

			updateToggle: false
		})
	}


	// CHECK Create or Update and Cancle button
	const createOrUpdateBtn = () => {
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

	// updatelist submit update
	const submitUpdate = () => {

		const updateServiceCenter = {
			name: state.name,
			serviceLocation: state.serviceLocation,
			admin: state.admin,
			maxBookingDays: state.maxBookingDays,
			contact: state.contact,
			bookingLimit: state.bookingLimit
		}

		// Add service center
		props.addServiceCenter(updateServiceCenter)
		// set admin assignServiceCenter
		props.assignServiceCenter(state.admin, 1)



		// reset state
		setState({
			name: "",
			serviceLocation: "",
			admin: "",
			maxBookingDays: "",
			contact: "",
			bookingLimit: "",

			updateToggle: false
		})
	}


	const getlist = props.sclists.map((sclist, index) => {
		return (
			<tr key={index}>
				<td className="pt-3-half" >{index + 1}</td>
				<td className="pt-3-half" name="location">{sclist.serviceLocation}</td>
				<td className="pt-3-half" name="name">{sclist.name}</td>
				<td className="pt-3-half" name="admin">{sclist.admin.name}</td>
				<td className="pt-3-half" name="bookingDays">{sclist.maxBookingDays}</td>
				<td className="pt-3-half" name="bookingLimit">{sclist.bookingLimit}</td>
				<td className="pt-3-half" name="contact">{sclist.contact}</td>
				<td>
					<span className="table-remove">
						{/* Update */}
						<button
							type="button"
							className="btn btn-primary btn-rounded btn-sm my-0 mx-1"
							onClick={() => updateHandler(sclist)}><MdModeEdit /></button>

						<button
							type="button"
							className="btn btn-danger btn-rounded btn-sm my-0"
							onClick={() => deleteHandler(sclist)}><MdDelete /></button>
					</span>
				</td>
			</tr>
		)
	})

	// map vacant admin to select options
	const vacantAdmin = props.vadminlist.map((al, index) => {
		return (
			<React.Fragment>
				<option key={index} value={al._id}>{al.name}</option>
			</React.Fragment>
		)
	})

	return (
		<div className="card">
			{/* Title */}
			<span className="badge badge-info">
				<h3 className="card-header text-center font-weight-bold text-uppercase py-4">Service Centers</h3>
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
							<tr>
								<td>#</td>
								<td><input
									name="serviceLocation"
									type="text"
									className="form-control"
									placeholder="Service Location"
									value={state.serviceLocation}
									onChange={onChangeHandler} />

								</td>
								<td><input
									name="name"
									type="text"
									className="form-control"
									placeholder="Service Center Name"
									value={state.name}
									onChange={onChangeHandler} />
								</td>
								<td>
									{/* Vacant admin list */}
									<select
										className="form-control"
										// style={{ width: '18em ' }}
										onChange={e => setState({ ...state, admin: e.target.value })}>
										<option className="bg-info text-white" selected={true}>--Select Admin--</option>
										{vacantAdmin}
									</select>

								</td>
								<td><input
									name="maxBookingDays"
									type="text"
									className="form-control"
									placeholder="Bookable Days"
									value={state.maxBookingDays}
									onChange={onChangeHandler}
								/>
								</td>
								<td><input
									name="bookingLimit"
									type="text"
									className="form-control"
									placeholder="Booking Limit"
									value={state.bookingLimit}
									onChange={onChangeHandler}
								/>
								</td>
								<td><input
									name="contact"
									type="text"
									className="form-control"
									placeholder="Contact"
									value={state.contact}
									onChange={onChangeHandler}
								/>
								</td>
								<td>
									{/* Create or Update button based on state.updateToogle condition */}
									{createOrUpdateBtn(state)}
								</td>
							</tr>

							{/* If update clicked then turn off list */}
							{state.updateToggle ? null : getlist}
						</tbody>
					</table>
				</div>
			</div>
		</div >
	)
}

ServiceCenter.propTypes = {
	serviceCenterList: PropTypes.func.isRequired,
	vacantAdminList: PropTypes.func.isRequired,
	addServiceCenter: PropTypes.func.isRequired,
	deleteServiceCenter: PropTypes.func.isRequired,
	assignServiceCenter: PropTypes.func
}

const mapStateToProps = state => ({
	sclists: state.serviceCenterList.sclist,
	vadminlist: state.admin.vadminlist,
	loading: state.admin.loading
})

export default connect(mapStateToProps,
	{ serviceCenterList, vacantAdminList, addServiceCenter, deleteServiceCenter, assignServiceCenter })
	(ServiceCenter)