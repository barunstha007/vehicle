import React from 'react'
import { MdEdit, MdDelete } from 'react-icons/md';
import { IoIosAddCircle } from 'react-icons/io';

export default function ServiceLocation() {
    return (
        <div className="d-flex justify-content-center mt-3">
            <div className="col-md-6">
                <h2 className="my-3 text-center"><strong>Servicing Centers </strong></h2><br />
                <tr>
                    <td></td>
                    <td><input type="text" value="" placeholder="Service Center Name" className="form-control mr-2 p-2" /></td>
                    <td><input type="text" value="" placeholder="Service Center Location" className="form-control mr-4 p-2" /></td>
                    <td><input type="text" value="" placeholder="Service Center Admin" className="form-control p-2" /></td>
                    <td className="text-center">
                        <button className='btn btn-info m-1'>
                            <IoIosAddCircle size={17} />
                        </button></td>

                </tr>
                {/* Table Here */}
                <table className="p-3 mt-3">
                    {/* Head */}
                    <thead>
                        <tr className="text-center b-1">
                            <td className="b-1">S.N</td>
                            <td>Name</td>
                            <td>Location</td>
                            <td>Admin</td>
                            <td className="text-center">Edit</td>
                            <td className="text-center">Del</td>
                        </tr>
                    </thead>

                    <tr>
                        <td>1</td>
                        <td><input type="text" value="Star Garage" className="form-control m-0 p-2" /></td>
                        <td><input type="text" value="Lazimpat" className="form-control m-0 p-2" /></td>
                        <td><input type="text" value="Lokesh" className="form-control m-0 p-2" /></td>
                        <td className="text-center">
                            <a className='btn btn-info btn-xs' href="#">
                                <MdEdit size={18} />
                            </a></td>
                        <td>  <a href="#" className="btn btn-danger btn-xs ml-1">
                            <MdDelete size={18} />
                        </a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><input type="text" value="Star Garage" className="form-control m-0 p-2" /></td>
                        <td><input type="text" value="Lazimpat" className="form-control m-0 p-2" /></td>
                        <td><input type="text" value="Lokesh" className=" form-control m-0 p-2" /></td>
                        <td className="text-center">
                            <a className='btn btn-info btn-xs' href="#">
                                <MdEdit size={18} />
                            </a></td>
                        <td>  <a href="#" className="btn btn-danger btn-xs ml-1">
                            <MdDelete size={18} />
                        </a>
                        </td>
                    </tr>

                    {/* Add New Service Center */}

                </table>
            </div>
        </div>
    )
}
