import React, { Component } from "react";
import './tutorCard.css'

class TutorCard extends Component {
    render() {
        return (
            <div className="card col-md-3 mb-4 ml-3 mr-3 text-center">
                <div class="row">
                    <div class="col-md-5">
                        <img class="card-img mt-3" src="#" alt="Tutor image"></img>
                    </div>
                    <div class="col-md-7 card-body">
                        <h4 class="card-title">Tutor Name</h4>
                    </div>
                </div>
                <hr></hr>
                <p class="card-text">Next available: Time</p>
                <a href="#" class="btn btn-danger mb-3">Book Now</a>
            </div>
        );
    }
}

export default TutorCard;