import { DatePicker, TimePicker } from 'antd';
import CheckChatLogin from '../components/CheckChatLogin';
import React, { useEffect, useState } from 'react';

const DoctorSchedule = () => {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [busyTime, setBusyTime] = useState([]);

    const handleAddDate = (e) => {
        // e.preventDefault();
        let arr = [];
        const busy = `${date} ${startTime} ${endTime}`;
        arr.push(busy);
        setBusyTime(arr);

        setDate('');
        setStartTime('');
        setEndTime('');
    };

    console.log(busyTime);
    return (
        <>
            <div className="py-5" style={{ backgroundColor: 'rgb(246, 247, 251)' }}>
                <h2 className="text-center blue-color">Add Your Busy Time</h2>
                <div className="container mt-5">
                    <div className="row g-3">
                        <div className="col-lg-4 col-12 col-md-4">
                            <DatePicker onChange={(date, dateString) => setDate(dateString)} style={{ width: '80%' }} />
                        </div>
                        <d className="col-lg-6 col-12 col-md-6 d-flex align-items-center" style={{ gap: '20px' }}>
                            <div>
                                <span className="me-2">From</span>
                                <TimePicker
                                    onChange={(time, timeString) => setStartTime(timeString)}
                                    format="h:mm a"
                                    status="warning"
                                />
                            </div>
                            <div>
                                <span className="me-2">To</span>
                                <TimePicker
                                    onChange={(time, timeString) => setEndTime(timeString)}
                                    format="h:mm a"
                                    status="warning"
                                />
                            </div>
                        </d>
                        <div className="col-lg-2 col-12 col-md-2">
                            <button className="btn btn-primary" onClick={handleAddDate}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                <div className="container mt-5 d-flex" style={{ listStyle: 'none' }}>
                    {busyTime.map((index, key) => (
                        <li key={key} style={{ padding: '20px', backgroundColor: '#fff', width: 'fit-content' }}>
                            {index}
                        </li>
                    ))}
                </div>
                <CheckChatLogin />
            </div>
        </>
    );
};

export default DoctorSchedule;
