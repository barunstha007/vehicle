import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MdModeEdit, MdDelete, MdCancel, MdRemoveRedEye } from "react-icons/md";
import { InputGroup, FormControl, Button } from "react-bootstrap";
// Redux
import { connect } from "react-redux";
import {
  getAdmin,
  addAdmin,
  deleteAdmin,
  updateAdmin,
} from "../../redux/actions/admin";
import Alert from "../../layout/Alert";

function AdminUsers(props) {
  const title = [
    "S.N",
    "Name",
    "Location",
    "Phone",
    "Email",
    "Assigned Service Center",
    "Username",
    "Password",
    "Actions",
  ];

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
    passwordHidden: true,
  });

  useEffect(() => {
    props.getAdmin();
  }, []);

  // input onchange handler
  const onChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // password show/hide
  const passwordShowBtn = () => {
    setState({
      ...state,
      passwordHidden: state.passwordHidden ? false : true,
    });
  };

  const addHandler = () => {
    const createAdmin = {
      name: state.name,
      location: state.location,
      phone: state.phone,
      email: state.email,
      username: state.username,
      password: state.password,
    };

    // Create Admin
    props.addAdmin(createAdmin, setState);
  };
  const updateHandler = (data) => {
    setState({
      name: data.name,
      id: data._id,
      location: data.location,
      phone: data.phone,
      email: data.email,
      username: data.username,
      password: "",

      updateToggle: true,
    });
  };
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

      updateToggle: false,
    });
  };
  const deleteHandler = (adminID) => {
    // console.log(adminID)
    var confirm = window.confirm(
      "Are you sure you want to delete this Admin? This deletion is irriversible"
    );
    if (confirm) {
      return props.deleteAdmin(adminID);
    }
  };
  const submitUpdate = () => {
    const adminDetails = {
      id: state.id,
      name: state.name,
      location: state.location,
      phone: state.phone,
      email: state.email,
      username: state.username,
      password: state.password,
    };

    props.updateAdmin(adminDetails);

    console.log(adminDetails);
    // reset state
    setState({
      id: "",
      name: "",
      location: "",
      phone: "",
      email: "",
      username: "",
      password: "",

      updateToggle: false,
    });
  };

  // CHECK Create or Update and Cancle button
  const createOrUpdateBtn = (state) => {
    if (state.updateToggle)
      return (
        <React.Fragment>
          <button
            type="button"
            className="btn btn-primary btn-rounded btn-sm my-0 mx-1"
            onClick={submitUpdate}
          >
            <MdModeEdit />
          </button>

          <button
            type="button"
            className="btn btn-danger btn-rounded btn-sm my-0"
            onClick={updateCancelHandler}
          >
            <MdCancel />
          </button>
        </React.Fragment>
      );
    else
      return (
        <button
          type="button"
          className="btn btn-success btn-rounded my-0 mx-1"
          onClick={addHandler}
        >
          Create
        </button>
      );
  };

  const getadminlist = props.adminlist.map((admin, index) => {
    return (
      <tr key={index}>
        <td className="pt-3-half">{index + 1}</td>
        <td className="pt-3-half" name="name">
          {admin.name}
        </td>
        <td className="pt-3-half" name="location">
          {admin.location}
        </td>
        <td className="pt-3-half" name="phone">
          {admin.phone}
        </td>
        <td className="pt-3-half" name="email">
          {admin.email}
        </td>
        <td className="pt-3-half" name="email">
          {admin.assignedServiceCenter}
        </td>
        <td className="pt-3-half" name="username">
          {admin.username}
        </td>
        <td className="pt-3-half " style={{ background: "#cfcccc" }}></td>
        <td>
          <span className="table-remove">
            {/* Update */}
            <button
              type="button"
              className="btn btn-primary btn-rounded btn-sm my-0 mx-1"
              onClick={() => updateHandler(admin)}
            >
              <MdModeEdit />
            </button>

            <button
              type="button"
              className="btn btn-danger btn-rounded btn-sm my-0"
              onClick={() => deleteHandler(admin)}
            >
              <MdDelete />
            </button>
          </span>
        </td>
      </tr>
    );
  });

  return (
    <div className="card">
      {/* Title */}
      <span className="badge badge-info">
        <h3 className="card-header text-center font-weight-bold text-uppercase py-4">
          Admin
        </h3>
      </span>
      <div className="card-body">
        <div id="table" className="table-editable">
          <span className="table-add float-right mb-3 mr-2">
            <a href="#!" className="text-success">
              <i className="fas fa-plus fa-2x" aria-hidden="true"></i>
            </a>
          </span>
          <Alert />

          <table className="material-card table table-bordered table-responsive-md table-striped text-center">
            {/* Table Headers */}
            <thead>
              <tr>
                {title.map((title, index) => {
                  return (
                    <th
                      key={index}
                      className="text-center"
                    >
                      {title}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {/* Create Superadmin */}
              <tr>
                <td>#</td>
                <td>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={state.name}
                    onChange={onChangeHandler}
                  />
                </td>
                <td>
                  <input
                    name="location"
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    value={state.location}
                    onChange={onChangeHandler}
                  />
                </td>
                <td>
                  <input
                    name="phone"
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                    value={state.phone}
                    onChange={onChangeHandler}
                  />
                </td>
                <td>
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={state.email}
                    onChange={onChangeHandler}
                  />
                </td>
                <td>
                  <input
                    name="assignedServiceCenter"
                    type="text"
                    disabled={true}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    name="username"
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={state.username}
                    onChange={onChangeHandler}
                  />
                </td>
                <td>
                  <InputGroup className="">
                    <FormControl
                      name="password"
                      value={state.password}
                      onChange={onChangeHandler}
                      type={state.passwordHidden ? "password" : "text"}
                      placeholder="New Password"
                    />
                    <InputGroup.Append>
                      <Button
                        variant="outline-secondary"
                        onClick={passwordShowBtn}
                      >
                        <MdRemoveRedEye />
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </td>
                <td>
                  {/* Create or Update button based on state.updateToogle condition */}
                  {createOrUpdateBtn(state)}
                </td>
              </tr>

              {/* If update clicked then turn off list */}
              {state.updateToggle ? null : getadminlist}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

AdminUsers.propTypes = {
  getAdmin: PropTypes.func.isRequired,
  addAdmin: PropTypes.func.isRequired,
  deleteAdmin: PropTypes.func.isRequired,
  updateAdmin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  adminlist: state.admin.adminlist,
});

export default connect(mapStateToProps, {
  getAdmin,
  addAdmin,
  deleteAdmin,
  updateAdmin,
})(AdminUsers);
