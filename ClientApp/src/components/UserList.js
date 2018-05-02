import axios from "axios/index";
import CheckAuth from "./CheckAuth";
var React = require('react');
var Link = require('react-router-dom').Link;

export default class UserList extends React.Component {

    constructor() {
        super();
        this.state = {
            users: new Array()
        };
        this.getBugs = this.getBugs.bind(this);
    }

    componentDidMount() {
        CheckAuth.bind(this)();
        axios.get('api/getUsers')
            .then(res => {
                this.setState({ users: res.data });
            })
    }

    getBugs() {
        let bugs = Object.values(this.state.users).map((user) => {
            return (
                <React.Fragment>
                    <tr>
                        <td>{user.userId}</td>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                    </tr>
                </React.Fragment>
            );
        });

        return bugs;
    }


    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Surname</td>
                    </tr>
                </thead>
                <tbody>
                    {this.getBugs()}
                </tbody>
            </table>
            )
    }
}