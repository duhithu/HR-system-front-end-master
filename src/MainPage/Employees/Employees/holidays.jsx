import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import axios from "axios";
import moment from "moment";


const Holidays = () => {

  const [holidays, setHolidays] = useState({title: '', date: ''});
  const [holidaysList, setHolidaysList] = useState([]);
  const [removeHolidayId, setRemoveHolidayId] = useState(undefined);
  const [editHoliday, setEditHoliday] = useState({title: '', date: '',id:null});

  useEffect( () => {
    getHolidays()
  }, []);

  const getHolidays = async () => {
      const res = await axios.get('http://127.0.0.1:8000/api/holidays/');
      console.log(res)
      setHolidaysList(res.data);
  }

  const addHolidayHandler = async event => {
      event.preventDefault();
      console.log(holidays);
      const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      const day = new Date(holidays.date).getDay();
      const holiday = {
          ...holidays,
          day: weekday[day]
      }

      await axios.post(' http://127.0.0.1:8000/api/holidays/', holiday)
          .then(res => {
              setHolidaysList(res.data);
          })
          .catch(err => {
              console.log(err);
          });
  }

    const editHolidayHandler = async event => {
        event.preventDefault();
        console.log(holidays);
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const day = new Date(editHoliday.date).getDay();
        const holiday = {
            ...editHoliday,
            day: weekday[day]
        }

        await axios.post(`http://localhost:8000/api/holidays/${editHoliday.id}`, holiday)
            .then(res => {
                setHolidaysList(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    }

  const removeHoliday = id => {
      axios.delete(`http://localhost:8000/api/holidays/${id}`)
          .then(res => {
              setHolidaysList(res.data);
          })
          .catch(err => {
              console.log(err);
          });
  }

  const formatDate = date => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      const separateDate = date.split('-');
      const year = separateDate[0];
      const month = months[--separateDate[1]];
      const day = separateDate[2];
      return `${day} ${month} ${year}`;
  }

    return (
        <div className="page-wrapper">
            <Helmet>
                <title>Holidays - HRMS Admin Template</title>
                <meta name="description" content="Login page"/>
            </Helmet>
            {/* Page Content */}
            <div className="content container-fluid">
                {/* Page Header */}
                <div className="page-header">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="page-title">Holidays 2022</h3>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/app/main/dashboard">Dashboard</Link></li>
                                <li className="breadcrumb-item active">Holidays</li>
                            </ul>
                        </div>
                        <div className="col-auto float-right ml-auto">
                            <a href="#" className="btn add-btn" data-toggle="modal" data-target="#add_holiday"><i
                                className="fa fa-plus"/> Add Holiday</a>
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
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Holiday Date</th>
                                    <th>Day</th>
                                    <th className="text-right">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    holidaysList && holidaysList.length>0 && holidaysList.map((holiday,index) => (
                                        <tr className={moment() > moment(holiday.date) ?  'holiday-completed':''} key={holiday.id}>
                                            <td>{index++}</td>
                                            <td>{holiday.title}</td>
                                            <td>{formatDate(holiday.date)}</td>
                                            <td>{holiday.day}</td>
                                            <td className="text-right">
                                                <div className={moment() > moment(holiday.date) ?  'dropdown dropdown-action d-none':'dropdown dropdown-action'}>
                                                    <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown"
                                                       aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <a className="dropdown-item" href="#" data-toggle="modal"
                                                           data-target="#edit_holiday" onClick={() => setEditHoliday({title:holiday.title,date:holiday.date, id: holiday.id})}><i className="fa fa-pencil m-r-5"/> Edit</a>
                                                        <a className="dropdown-item" href="#" data-toggle="modal"
                                                           data-target="#delete_holiday" onClick={() => setRemoveHolidayId(holiday.id)}><i
                                                            className="fa fa-trash-o m-r-5"/> Delete</a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
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
                            <h5 className="modal-title">Add Holiday</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={addHolidayHandler}>
                                <div className="form-group">
                                    <label>Holiday Name <span className="text-danger">*</span></label>
                                    <input className="form-control" value={holidays.title} onChange={e=>setHolidays({...holidays,title: e.target.value})} type="text"/>
                                </div>
                                <div className="form-group">
                                    <label>Holiday Date <span className="text-danger">*</span></label>
                                    <div><input className="form-control datetimepicker" type="date" value={holidaysList.date} onChange={e=>setHolidays({...holidays,date: e.target.value})}/></div>
                                </div>
                                <div className="submit-section">
                                    <button className="btn btn-primary submit-btn">Submit</button>
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
                            <h5 className="modal-title">Edit Holiday</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editHolidayHandler}>
                                <div className="form-group">
                                    <label>Holiday Name <span className="text-danger">*</span></label>
                                    <input className="form-control" defaultValue="New Year" type="text" value={editHoliday.title} onChange={e=>setEditHoliday({...editHoliday,title: e.target.value})}/>
                                </div>
                                <div className="form-group">
                                    <label>Holiday Date <span className="text-danger">*</span></label>
                                    <div><input className="form-control datetimepicker" defaultValue="01-01-2019"
                                                type="date" value={editHoliday.date} onChange={e=>setEditHoliday({...editHoliday,date: e.target.value})}/></div>
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
                                <h3>Delete Holiday</h3>
                                <p>Are you sure want to delete?</p>
                            </div>
                            <div className="modal-btn delete-action">
                                <div className="row">
                                    <div className="col-6">
                                        <a href="#" className="btn btn-primary continue-btn" onClick={() => removeHoliday(removeHolidayId)}>Delete</a>
                                    </div>
                                    <div className="col-6">
                                        <a href="#" data-dismiss="modal"
                                           className="btn btn-primary cancel-btn">Cancel</a>
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

export default Holidays;
