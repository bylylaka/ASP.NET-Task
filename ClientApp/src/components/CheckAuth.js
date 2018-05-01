import axios from "axios/index";
var Link = require('react-router-dom').Link;
var React = require('react');

export default function IsAuthenticated() {
    axios.get('api/IsAuthenticated')
        .then(res => {
            if (res.data == false)
                this.props.history.push("Login");
        })
}