import axios from "axios/index";
var React = require('react');

export default class SignIn extends React.Component {

    componentDidMount() {
        axios.get('api/getBugs')
            .then(
                (response) => { console.log('resss') },
                (error) => { console.log('errr') }
            )
    }

    render() {
        return (
            <form action={"SignIn"} method="post">
                <label>
                    Login:
                    <input type="text" name="Login" placeholder="Type here..." required />
                </label>
                <label>
                    Name:
                    <input type="text" name="Name" placeholder="Type here..." required />
                </label>
                <label>
                    Surname:
                    <input type="text" name="Surname" placeholder="Type here..." required />
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