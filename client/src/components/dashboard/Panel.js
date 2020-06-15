import React, { Component } from "react";

class Panel extends Component {
    render() {
        return (
            <div id="panel-wrapper">
                <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <button class="btn bg-red btn-red" id="menu-toggle" onClick={this.props.action}><span class="navbar-toggler-icon"></span></button>
                </nav>
                <div class="container-fluid">
                    <h1 class="mt-4">Client Dashboard</h1>
                    <p>This is where the client will be able to schedule tutoring sessions.</p>
                </div>
            </div>
        );
    }
}

export default Panel;