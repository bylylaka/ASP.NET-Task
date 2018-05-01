import axios from "axios/index";
var React = require('react');

export default class Login extends React.Component {

    componentDidMount() {
        axios.get('api/IsAuthenticated')
            .then(res => {
                if (res.data == true)
                    this.props.history.push("../");
            })
    }

    render() {
        return (
            <form action={"Login"} method="post">
                <label>
                    Login:
                    <input type="text" name="Login" placeholder="Type here..." required />
                </label>
                <label>
                    Password:
                    <input type="password" name="Password" placeholder="Type here..." required />
                </label>
                <button type="submit">Send</button>
            </form>
        )
    }
}