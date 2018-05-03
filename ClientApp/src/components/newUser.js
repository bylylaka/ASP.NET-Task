import '../css/newUser.css'
import axios from "axios/index";
import CheckAuth from "./CheckAuth"
var React = require('react');

export default class NewUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Login: new String(),
            Name: new String(),
            Surname: new String(),
            Password: new String()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.HandleChange = this.HandleChange.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();

        var bodyFormData = new FormData();
        bodyFormData.set('Login', this.state.Login);
        bodyFormData.set('Name', this.state.Name);
        bodyFormData.set('Surname', this.state.Surname);
        bodyFormData.set('Password', this.state.Password);

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

    HandleChange(e) {
        console.log(this.state.Login)
        this.setState({ [e.target.name]: e.target.value });
    };


    render() {
        return (
            <form onSubmit={this.handleSubmit} method="post" className="newUser">
                <label>
                    Login:
                    <input type="text" name="Login" value={this.state.login} onChange={this.HandleChange} placeholder="Type here..." required/>
                </label>
                <label>
                    Name:
                    <input type="text" name="Name" value={this.state.name} onChange={this.HandleChange} placeholder="Type here..." required/>
                </label>
                <label>
                    Surname:
                    <input type="text" name="Surname" value={this.state.surname} onChange={this.HandleChange} placeholder="Type here..." required/>
                </label>
                <label>
                    Password:
                    <input type="text" name="Password" value={this.state.password} onChange={this.HandleChange} placeholder="Type here..." required/>
                </label>
                
                <button type="submit">Send</button>
            </form>
        )
    }
}