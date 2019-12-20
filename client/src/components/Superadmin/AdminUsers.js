import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { MdModeEdit, MdDelete, MdCancel, MdRemoveRedEye } from 'react-icons/md'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
// Redux
import { connect } from 'react-redux'
import { getSuperadmin } from '../../redux/actions/superadmin'
import Alert from '../../layout/Alert'

function ServiceCenter(props) {

  const title = ['S.N', 'Name', 'Location', 'Phone', 'Email', 'Username', 'Password', 'Actions']

  // Create input change
  const [state, setState] = useState({
    id: "",
    name: "",
    location: "",
    phone: "",
    email: "",
    username: "",
    password: "",

    updateToggle: false,
    passwordHidden: true
  })


  useEffect(() => {
    props.getSuperadmin()

  }, [])

  // input onchange handler
  const onChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  // password show/hide
  const passwordShowBtn = () => {
    setState({
      ...state,
      passwordHidden: state.passwordHidden ? false : true
    })
  }

  const addHandler = () => {

  }
  const updateHandler = (data, index) => {
    setState({
      ...state,
      id: data._id,
      name: data.name,
      location: data.location,
      phone: data.phone,
      email: data.email,
      username: data.username,
      password: "",

      updateToggle: true
    })
  }
  const updateCancelHandler = () => {
    setState({
      ...state,
      id: "",
      name: "",
      location: "",
      phone: "",
      email: "",
      username: "",
      password: "",

      updateToggle: false
    })
  }
  const deleteHandler = () => {

  }
  const submitUpdate = () => {

    if (state.password.trim().length > 0) {
      const updateSuperadmin = {
        id: state._id,
        name: state.name,
        location: state.location,
        phone: state.phone,
        email: state.email,
        username: state.username,
        password: state.password
      }
      // props.updateSuperadmin()

    } else {

      const updateSuperadmin = {
        id: state._id,
        name: state.name,
        location: state.location,
        phone: state.phone,
        email: state.email,
        username: state.username,
      }
      console.log(updateSuperadmin)
    }
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



  const getsuperadminlist = props.superadminlist.map((superadmin, index) => {
    return (
      <tr key={index}>
        <td className="pt-3-half" >{index + 1}</td>
        <td className="pt-3-half" name="name">{superadmin.name}</td>
        <td className="pt-3-half" name="location">{superadmin.location}</td>
        <td className="pt-3-half" name="phone">{superadmin.phone}</td>
        <td className="pt-3-half" name="email">{superadmin.email}</td>
        <td className="pt-3-half" name="username">{superadmin.username}</td>
        <td className="pt-3-half bg-secondary text-white" ><strong>- - -</strong></td>
        <td>
          <span className="table-remove">
            {/* Update */}
            <button
              type="button"
              className="btn btn-primary btn-rounded btn-sm my-0 mx-1"
              onClick={() => updateHandler(superadmin, index)}><MdModeEdit /></button>

            <button
              type="button"
              className="btn btn-danger btn-rounded btn-sm my-0"
              onClick={() => deleteHandler(superadmin)}><MdDelete /></button>
          </span>
        </td>
      </tr>
    )
  })

  return (
    <div className="card">
      {/* Title */}
      <span className="badge badge-info">
        <h3 className="card-header text-center font-weight-bold text-uppercase py-4">Superadmin</h3>
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
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={state.name}
                  onChange={onChangeHandler} />

                </td>
                <td><input
                  name="location"
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  value={state.location}
                  onChange={onChangeHandler} />
                </td>
                <td><input
                  name="phone"
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  value={state.phone}
                  onChange={onChangeHandler} />
                </td>
                <td><input
                  name="email"
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={state.email}
                  onChange={onChangeHandler}
                />
                </td>
                <td><input
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={state.username}
                  onChange={onChangeHandler}
                />
                </td>
                <td>
                  {/* <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={state.password}
                  onChange={onChangeHandler}
                /> */}
                  <InputGroup className="">
                    <FormControl
                      type={state.passwordHidden ? "password" : "text"}
                      placeholder="New Password"
                    />
                    <InputGroup.Append>
                      <Button variant="outline-secondary" onClick={passwordShowBtn}><MdRemoveRedEye /></Button>
                    </InputGroup.Append>
                  </InputGroup>
                </td>
                <td>
                  {/* Create or Update button based on state.updateToogle condition */}
                  {createOrUpdateBtn(state)}
                </td>
              </tr>

              {/* If update clicked then turn off list */}
              {state.updateToggle ? null : getsuperadminlist}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  )
}

ServiceCenter.propTypes = {
  getSuperadmin: PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
  superadminlist: state.superadmin.superadminlist
})

export default connect(mapStateToProps,
  { getSuperadmin })
  (ServiceCenter)