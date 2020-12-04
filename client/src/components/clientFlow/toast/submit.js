import { useToasts } from "react-toast-notifications";
import React from "react";

//You can change the position/orientation of the submit in App.js
const ToastSubmit = ({ props }) => {
  const { addToast } = useToasts();
  return (
    <button
      onSubmit={props.onSubmit}
      className="btn btn-danger"
      onClick={() =>
        addToast(
          "Appointment Submitted! We'll let you know when the tutor confirms the appointment!",
          {
            appearance: "success",
            placement: "bottom-left",
          }
        )
      }
    >
      Book Now
    </button>
  );
};

export default ToastSubmit;
