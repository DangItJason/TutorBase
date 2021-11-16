import React, {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch, useSelector} from "react-redux";
import {actions as clientFlowActions} from '../../store/ClientFlowData/slice';
import {selectClientFlowData} from "../../store/ClientFlowData/selectors";
import {api} from "../../services/api";
import {Appointment} from "../../services/api.types";

// Given a unix timestamp covert it to a readable time
// This is used to display the time nicely on the final step
function convertTimestamp(timestamp: any) {
    var d = new Date(timestamp), // Convert the passed timestamp to milliseconds
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),     // Add leading 0.
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh == 0) {
        h = 12;
    }

    time = h + ':' + min + ' ' + ampm;
    return time;
}

export function Step5() {
    const dispatch = useDispatch();
    const clientFlowData = useSelector(selectClientFlowData)
    toast.configure();

    const confirmSubmit = () => {
        toast.success(
            "Appointment Submitted! We'll let you know when the tutor confirms the appointment!!",
            {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }
        );
    };

    const handleSubmit = async () => {
        let appointment: Appointment = {
            notes: clientFlowData.appointmentNotes,
            price: clientFlowData.selectedTutor.price,
            client_id: clientFlowData.clientId,
            tutor_id: clientFlowData.selectedTutor._id,
            location: clientFlowData.appointmentLocation,
            end_time: clientFlowData.appointmentEndTime,
            start_time: clientFlowData.appointmentStartTime,
            course_id: clientFlowData.selectedCourse.id,
            appt_id: "null",
            confirmed: false,
        }
        await api.CreateAppointment(appointment);

        dispatch(clientFlowActions.incrementStep());

        confirmSubmit();
    };

    return (
        <div className="form-group text-center">

            {!(clientFlowData.currentStep === 5) ? (
                <>
                    <h3 className="hr mt-1">Reserve</h3>
                    <h3>
                        {clientFlowData.appointmentDate}, {convertTimestamp(clientFlowData.appointmentStartTime)} - {convertTimestamp(clientFlowData.appointmentEndTime)}
                    </h3>
                    <h4>Notes</h4>
                    <textarea
                        className="form-input"
                        name="notes"
                        id="notes"
                        value={clientFlowData.appointmentNotes}
                        onChange={(value) => dispatch(clientFlowActions.setAppointmentNotes(value.target.value))}
                        placeholder="Have a preferred location? Need help on a specific homework or project? Let the tutor know here!"
                    />
                    <br/>
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        <ToastContainer/>
                        Book Now
                    </button>
                </>
            ) : (
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <h3 className="hr mt-1">Reserved</h3>
                    <h3>
                        {clientFlowData.appointmentDate}, {convertTimestamp(clientFlowData.appointmentStartTime)} - {convertTimestamp(clientFlowData.appointmentEndTime)}
                    </h3>
                    <p style={{maxWidth: '400px'}}>Your appointment has been scheduled, please wait for the tutor to accept or deny
                        the request. You can see updates under the meetings schedule tab.</p>
                    <br/>
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            dispatch(clientFlowActions.resetSteps())
                        }}
                    >
                        <ToastContainer/>
                        Schedule another session!
                    </button>
                </div>
            )}
        </div>
    );
}
