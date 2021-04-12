import React from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ApiBaseAddress} from "../../utils/Environment";
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

        // Create Appointment
        let url = "http://localhost:9000/api/appointment";
        let headers = {
            "Content-Type": "application/json",
        };

        let start = new Date(clientFlowData.apptStartTime);
        let startMin = ("0" + start.getMinutes()).slice(-2);
        let startHour = ("0" + start.getHours()).slice(-2);

        let end = new Date(clientFlowData.apptEndTime);
        let endMin = ("0" + start.getMinutes()).slice(-2);
        let endHour = ("0" + start.getHours()).slice(-2);

        let body = {
            course_id: clientFlowData.courseId,
            start: start,
            end: endHour + endMin,
            loc: clientFlowData.apptLoc,
            tutor_id: clientFlowData.tutorId,
            client_id: clientFlowData.clientId,
            price: 50,
            // notes: clientFlowData.notes,
        };

        console.log("RESERVE POST BODY: ", body);

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        }).then((res) => {
            console.log(res);
        });

        // TODO: Verify appointment creation and send email to client and tutor for confirmation

        // Notify user that everything was created in the system.
        confirmSubmit();
    };

    // Only render this step if currentStep matches
    if (clientFlowData.currentStep !== 5) return null;

    return (
        <div className="form-group text-center">
            <h3 className="hr mt-1">Reserve</h3>
            <h3>
                {clientFlowData.apptDate}, {clientFlowData.apptStartTime} - {clientFlowData.apptEndTime}
            </h3>
            <h4>Notes</h4>
            <textarea
                className="form-input"
                name="notes"
                id="notes"
                value={clientFlowData.apptNotes}
                onChange={(value) => dispatch(clientFlowActions.setNotes(value.target.value))}
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
