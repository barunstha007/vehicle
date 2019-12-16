import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux'
import { serviceCenterList } from '../../redux/actions/serviceCenterList'
import { vacantAdminList } from '../../redux/actions/admin'
import Alert from '../../layout/Alert'

function ServiceCenter(props) {

	const title = ['S.N', 'Location', 'Service Center Name', 'Admin', 'Booking Days', 'Booking Limit', 'Contact', 'Actions']


	// map vacant admin to select options
	const vacantAdmin = props.vadminlist.map((al, index) => {
		return (
			<option key={index} value={al._id}>{al.name}</option>
		)
	})


	const deleteHandler = e => {

	}


	useEffect(() => {
		// get list of service centers
		props.serviceCenterList()
		// get all vacant admin for dropdown
		props.vacantAdminList()

		// Set initial select value from reducer
		setState({
			...state,
			admin: props.initialSelect
		})

	}, [props.initialSelect])



	const [state, setState] = useState({
		name: "",
		serviceLocation: "",
		admin: "",
		maxBookingDays: "",
		contact: "",
		bookingLimit: "",
		updateToggle: false
	})

	const [updateValues, setUpdateValues] = useState({
		name: "",
		serviceLocation: "",
		admin: "",
		maxBookingDays: "",
		contact: "",
		bookingLimit: "",

		updateToggle: false
	})

	// CREATE change handler
	const onChangeHandler = e => {
		setState({
			...state,
			[e.target.name]: e.target.value
		})
	}

	const addHandler = e => {
		console.log(state)
	}

	// GET AND UPDATE

	const onUpdateChange = e => {
		setUpdateValues({
			...updateValues,
			[e.target.name]: e.target.value
		})


	}


	const updateHandler = (data, index) => {

		console.log(data, index)

		updatelist()
	}

	// updatelist submit update
	const submitUpdate = () => {
		console.log(updateValues)
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
						<button
							type="button"
							className="btn btn-primary btn-rounded btn-sm my-0 mx-1"
							onClick={() => updateHandler(sclist, index)}>Update</button>

						<button
							type="button"
							className="btn btn-danger btn-rounded btn-sm my-0"
							onClick={deleteHandler}>Delete</button>
					</span>
				</td>
			</tr>
		)
	})

	function updatelist() {
		return (
			<tr >
				<td className="pt-3-half" ></td>
				<td className="pt-3-half" name="location">
					<input
						className="form-control"
						type="text"
						value={updateValues.serviceLocation}
						onChange={onUpdateChange}
						name="serviceLocation" />
				</td>
				<td className="pt-3-half" name="name">
					<input
						className="form-control"
						type="text"
						value={updateValues.name}
						onChange={onUpdateChange}
						name="name" />
				</td>
				<td className="pt-3-half" name="admin">
					<input
						className="form-control"
						type="text"
						value={updateValues.admin}
						onChange={onUpdateChange}
						name="admin" />
				</td>
				<td className="pt-3-half" name="bookingDays">
					<input
						className="form-control"
						type="text"
						value={updateValues.maxBookingDays}
						onChange={onUpdateChange}
						name="maxBookingDays" />
				</td>
				<td className="pt-3-half" name="bookingLimit">
					<input
						className="form-control"
						type="text"
						value={updateValues.bookingLimit}
						onChange={onUpdateChange}
						name="bookingLimit" />
				</td>
				<td className="pt-3-half" name="contact">
					<input
						className="form-control"
						type="text"
						value={updateValues.contact}
						onChange={onUpdateChange}
						name="contact" />
				</td>
				<td>
					<span className="table-remove">
						<button
							type="button"
							className="btn btn-primary btn-rounded btn-sm my-0 mx-1"
							onClick={submitUpdate}
						>Update</button>
					</span>
				</td>
			</tr>
		)
	}


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
								<td><button type="button"
									className="btn btn-success btn-rounded my-0 mx-1"
									onClick={addHandler}>Create</button>
								</td>
							</tr>


							{getlist}


						</tbody>
					</table>
				</div>
			</div>
		</div >
	)
}








ServiceCenter.propTypes = {
	serviceCenterList: PropTypes.func.isRequired,
	vacantAdminList: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	sclists: state.serviceCenterList.sclist,
	vadminlist: state.admin.vadminlist,
	initialSelect: state.admin.initialSelect
})

export default connect(mapStateToProps, { serviceCenterList, vacantAdminList })(ServiceCenter)
