import axios from "axios/index";
import CheckAuth from "./CheckAuth"
var React = require('react');

export default class NewUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: new String(),
            name: new String(),
            surname: new String(),
            password: new String()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeLogin = this.changeLogin.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeSurname = this.changeSurname.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();

        var bodyFormData = new FormData();
        bodyFormData.set('Login', this.state.login);
        bodyFormData.set('Name', this.state.name);
        bodyFormData.set('Surname', this.state.surname);
        bodyFormData.set('Password', this.state.password);

        axios({
            method: 'post',
            url: '/api/newUser',
            data: bodyFormData
        })
            .then(res => {
                alert(res.data);
            })
    };

    componentDidMount() {
        CheckAuth.bind(this)();
    }

    changeLogin = e => {
        this.setState({ login: e.target.value });
    };

    changeName = e => {
        this.setState({ name: e.target.value });
    };

    changeSurname = e => {
        this.setState({ surname: e.target.value });
    };

    changePassword = e => {
        this.setState({ password: e.target.value });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} method="post">
                <label>
                    Login:
                    <input type="text" name="Login" value={this.state.login} onChange={this.changeLogin} placeholder="Type here..." required/>
                </label>
                <label>
                    Name:
                    <input type="text" name="Name" value={this.state.name} onChange={this.changeName} placeholder="Type here..." required/>
                </label>
                <label>
                    Surname:
                    <input type="text" name="Surname" value={this.state.surname} onChange={this.changeSurname} placeholder="Type here..." required/>
                </label>
                <label>
                    Password:
                    <input type="text" name="Password" value={this.state.password} onChange={this.changePassword} placeholder="Type here..." required/>
                </label>
                
                <button type="submit">Send</button>
            </form>
        )
    }
}