import React, {useEffect,useState} from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom";
import axios from "axios";

const status = () => {

    // const history = useHistory();
    //Display Status
    const [Status, setStatus] = useState([]);


    useEffect(() => {
        // const loggedInUser = localStorage.getItem("user");
        // console.log(loggedInUser);
        function getStatus() {
            axios.get('http://127.0.0.1:8000/api/statuses/').then((res) => {
                console.log(res.data);
                setStatus(res.data);

            }).catch((err) => {
                alert(err);
            })
        }

        getStatus();
    }, []);

    // const StatusSetter = (e) => {
    //     setStatus(e.target.value);
    // }
    //Insert Status
    const [newStatus, setNewStatus] = useState("");

    const onSubmit = (e) => {
        console.log(newStatus)
        e.preventDefault();
        const payload = {
            status: newStatus,
        };
        console.log(Status)
        axios.post('http://127.0.0.1:8000/api/statuses/', payload)
            .then( res => {
            setStatus(res.data);
            console.log(res.data);
        }).catch((error) => {
        })
    }

    const [removeStatusId, setRemoveStatusId] = useState(undefined);

    const removeStatus = id => {
        axios.delete(`http://localhost:8000/api/statuses/${id}`)
            .then(res => {
                setStatus(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const [editStatus, setEditStatus] = useState({status: '', id: null});

    const editStatusHandler = async event => {
        event.preventDefault();
        console.log(Status);
        const status = {
            ...editStatus
        }

        await axios.post(`http://localhost:8000/api/statuses/${editStatus.id}`, status)
            .then(res => {
                setStatus(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    }

        return (

        <div className="page-wrapper">
            <Helmet>
                <title>Employee Status - Admin Template</title>
                <meta name="description" content="Login page"/>
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">Employee Status 2019</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Status</li>
                            </ul>
                        </div>
                        <div className="col-auto float-right ml-auto">
                            <a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_holiday"><i className="fa fa-plus" /> Add Status</a>
                        </div>
                    </div>
                </div>
                {/* /Page Header */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="table table-striped custom-table mb-0">
                                <thead>
                                <tr>
                                    <td>Id</td>
                                    <td>Status</td>
                                    <th className="text-right">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                Status && Status.length>0 && Status.map((status,index) => (
                                <tr className="holiday-upcoming" key={status.id}>
                                    <td>{index++}</td>
                                    <td>{status.status}</td>
                                    <td className="text-right">
                                        <div className="dropdown dropdown-action">
                                            <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                {/*onClick={() => setEditStatus({status:status.status,id: status.id})}*/}
                                                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#edit_holiday"  onClick={() => setEditStatus({status:status.status, id: status.id})}><i className="fa fa-pencil m-r-5" /> Edit</a>
                                                {/*onClick={() => setStatus(status.id)}*/}
                                                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_holiday" onClick={() => setRemoveStatusId(status.id)}><i className="fa fa-trash-o m-r-5" /> Delete</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Page Content */}
            {/* Add Holiday Modal */}
            <div className="modal custom-modal fade" id="add_holiday" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Employee Status</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Status <span className="text-danger">*</span></label>
                                    {/*onChange={(e) => {setNewStatus(e.target.value)}}*/}
                                    <input className="form-control" type="text" onChange={(e) => {setNewStatus(e.target.value)}} />
                                </div>
                                {/*<div className="form-group">*/}
                                {/*    <label>Inactive Employee Name <span className="text-danger">*</span></label>*/}
                                {/*    <div><input className="form-control datetimepicker" type="text" /></div>*/}
                                {/*</div>*/}
                                <div className="submit-section">
                                    {/*onClick={onSubmit}*/}
                                    <button className="btn btn-primary submit-btn" onClick={onSubmit}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Add Holiday Modal */}
            {/* Edit Holiday Modal */}
            <div className="modal custom-modal fade" id="edit_holiday" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Employee Status</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/*<form>*/}
                                <form onSubmit={editStatusHandler}>
                                <div className="form-group">
                                    <label>Enter Status <span className="text-danger">*</span></label>
                                    {/*value={editStatus.status} onChange={e=>setEditStatus({...editStatus,status: e.target.value})}*/}
                                    <input className="form-control" defaultValue="active" type="text" value={editStatus.status} onChange={e=>setEditStatus({...editStatus,status: e.target.value})}/>
                                </div>
                                <div className="submit-section">
                                    <button className="btn btn-primary submit-btn">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Edit Holiday Modal */}
            {/* Delete Holiday Modal */}
            <div className="modal custom-modal fade" id="delete_holiday" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="form-header">
                                <h3>Delete Status</h3>
                                <p>Are you sure want to delete?</p>
                            </div>
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        {/*onClick={() => removeStatus(removeStatusId)}*/}
                                        <a href="#" className="btn btn-primary continue-btn" onClick={() => removeStatus(removeStatusId)}>Delete</a>
                                    </div>
                                    <div className="col-6">
                                        <a href="" data-dismiss="modal" className="btn btn-primary cancel-btn">Cancel</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Delete Holiday Modal */}
        </div>
    );
}

export default status;