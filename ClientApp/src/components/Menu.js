import '../css/menu.css';
import axios from "axios/index";
import CheckAuth from "./CheckAuth";
var React = require('react');
var Link = require('react-router-dom').Link;

export default class Menu extends React.Component {

    constructor() {
        super();
        this.state = {
            isAuth: 0
        };
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        axios.get('api/IsAuthenticated')
            .then(res => {
                if (res.data == true)
                    this.setState({ isAuth: 1 });
            })
    }

    logOut() {
        axios.get(`/api/logOut`).then(res => { window.location.reload() })
    }

    render() {
        if (this.state.isAuth == 1) {
            return (
                <div className="menu">
                <input type="checkbox" id="menu-checkbox" />
                    <nav role="navigation">
                        <label htmlFor="menu-checkbox" className="toggle-button" data-open="Menu" data-close="Close"></label>
                    <ul className="main-menu">
                        <li><Link to="/Profile">Edit profile</Link></li>
                        <li><Link to="/newBug">Add bug</Link></li>
                        <li><Link to="/bugList">Bug list</Link></li>
                        <li><Link to="/userList">User list</Link></li>
                        <li><Link to="/newUser">Add user</Link></li>
                        <li><Link to="/" onClick={this.logOut}>Log out</Link></li>
                     </ul>
                 </nav>
                </div>
            )
        }
        else
            return ''
    }
}