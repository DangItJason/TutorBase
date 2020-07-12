import React, { Component } from "react";

class TutorCard extends Component {
    render() {
        return (
            <div class="card text-center">
                <div class="row">
                    <div class="col-md-5">
                        <img class="card-img mt-2 ml-2" src={this.props.data.img} alt="Tutor"></img>
                    </div>
                    <div class="col-md-7 card-body">
                        <h4 class="card-title">{this.props.data.name}</h4>
                    </div>
                </div>
                <hr></hr>
                <p class="card-text mb-3">Next available: {this.props.data.available}</p>
            </div>
        );
    }
}

export default TutorCard;