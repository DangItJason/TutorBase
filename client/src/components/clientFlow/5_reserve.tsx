import React from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch, useSelector} from "react-redux";
import {actions as clientFlowActions} from '../../store/ClientFlowData/slice';
import {selectClientFlowData} from "../../store/ClientFlowData/selectors";
import {api} from "../../services/api";
import {Appointment} from "../../services/api.types";

export function Step5() {
    const dispatch = useDispatch();
    const clientFlowData = useSelector(selectClientFlowData)
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
        console.log("Submitting");
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
        confirmSubmit();

        // TODO: Return to home page
    };

    return (
        <div className="form-group text-center">
            <h3 className="hr mt-1">Reserve</h3>
            <h3>
                {clientFlowData.appointmentDate}, {clientFlowData.appointmentStartTime} - {clientFlowData.appointmentEndTime}
            </h3>
            <h4>Notes</h4>
            <textarea
                className="form-input"
                name="notes"
                id="notes"
                value={clientFlowData.appointmentNotes}
                onChange={(value) => dispatch(clientFlowActions.setAppointmentNotes(value.target.value))}
                placeholder="Have a preferred location? Need help on a specific homework or project? Let the tutor know here!"
            >
          {/*{this.props.notes}*/}
        </textarea>
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
        </div>
    );
}
