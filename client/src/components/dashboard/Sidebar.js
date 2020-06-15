import React, { Component } from "react";

class Sidebar extends Component {
    render() {
        return (
            <div class="bg-red border-right" id="sidebar-wrapper">
                <div class="sidebar-heading">TutorBase</div>
                <div class="list-group list-group-flush">
                    <a href="#" class="list-group-item bg-red list-group-item-action">Settings</a>
                    <a href="#" class="list-group-item bg-red list-group-item-action">History</a>
                </div>
            </div>
        );
    }
}

export default Sidebar;