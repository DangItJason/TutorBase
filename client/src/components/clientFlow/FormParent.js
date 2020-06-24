import React, { Component, Fragment } from "react";

class FormParent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentStep: 1,
            subject: "",
            class: "",
            tutorID: "",
            day: "",
            time: ""
        }
    }

    handleChange = event => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    render() {
        return (
            <Fragment>

            </Fragment>
        );
    }
}

export default FormParent;