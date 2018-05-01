import '../css/newBug.css'
import axios from "axios/index";
import CheckAuth from "./CheckAuth"
var Link = require('react-router-dom').Link;
var React = require('react');

export default class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            profile: new Object()
        };
    }

    componentDidMount() {
        CheckAuth.bind(this)();
        axios.get('api/profile')
            .then(res => {
                this.setState({ profile: res.data });
                console.log(res.data)
            })
    }

    render() {
        return (
            <div>
                <h1>profile</h1>
                <p>Имя: {this.state.profile.name}</p>
                <p>Фамилия: {this.state.profile.surname}</p>
            </div>
            )
    }
}