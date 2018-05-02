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
                <ul className="menu-main">
                    <Link to="/Profile">Профиль</Link>
                    <Link to="/newBug">Новая ошибка</Link>
                    <Link to="/bugList">Все ошибки</Link>
                    <Link to="/userList">Список пользователей</Link>
                    <Link to="/newUser">Новый пользователь</Link>
                    <Link to="/" onClick={this.logOut}>Выйти</Link>
                </ul>
            )
        }
        else
            return ''
    }
}