import React from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch, useSelector} from "react-redux";
import {actions as clientFlowActions} from '../../store/ClientFlowData/slice';
import {selectClientFlowData} from "../../store/ClientFlowData/selectors";

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

    const handleSubmit = () => {
        console.log("Submitting");

        // Notify user that everything was created in the system.
        confirmSubmit();
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
