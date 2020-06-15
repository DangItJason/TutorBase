import React, { Component } from "react";

class Sidebar extends Component {
    render() {
        return (
            <div class="big-light border-right" id="sidebar-wrapper">
                <div class="sidebar-heading">TutorBase</div>
                <div class="list-group list-group-flush">
                    <a href="#" class="list-group-item list-group-item-action bg-light">Settings</a>
                    <a href="#" class="list-group-item list-group-item-action bg-light">History</a>
                </div>
            </div>
        );
    }
}

export default Sidebar;