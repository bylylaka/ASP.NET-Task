import axios from "axios/index";
var React = require('react');

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: new String(),
            password: new String()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    componentDidMount() {
        axios.get('api/IsAuthenticated')
            .then(res => {
                if (res.data == true)
                    this.props.history.push("../");
            })
    }

    handleSubmit = event => {
        event.preventDefault();

        var bodyFormData = new FormData();
        bodyFormData.set('Login', this.state.login);
        bodyFormData.set('Password', this.state.password);

        axios({
            method: 'post',
            url: '/Login',
            data: bodyFormData
        })
            .then(res => {
                if (res.data != 'OK') {
                    alert(res.data);
                }
                else
                    window.location.reload();
            })
    };

    changeLogin = e => {
        this.setState({ login: e.target.value });
    };

    changePassword = e => {
        this.setState({ password: e.target.value });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} method="post">
                <label>
                    Login:
                    <input type="text" name="Login" value={this.state.login} onChange={this.changeLogin} placeholder="Type here..." required />
                </label>
                <label>
                    Password:
                    <input type="password" name="Password" value={this.state.password} onChange={this.changePassword} placeholder="Type here..." required />
                </label>
                <button type="submit">Send</button>
            </form>
        )
    }
}