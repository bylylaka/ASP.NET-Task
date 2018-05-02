import CheckAuth from "./CheckAuth"
var React = require('react');

export default class NewUser extends React.Component {

    componentDidMount() {
        CheckAuth.bind(this)();
    }

    render() {
        return (
            <form action="api/newUser" method="post">
                <label>
                    Login:
                    <input type="text" name="Login" placeholder="Type here..." required/>
                </label>
                <label>
                    Name:
                    <input type="text" name="Name" placeholder="Type here..." required/>
                </label>
                <label>
                    Surname:
                    <input type="text" name="Surname" placeholder="Type here..." required/>
                </label>
                <label>
                    Password:
                    <input type="text" name="Password" placeholder="Type here..." required/>
                </label>
                
                <button type="submit">Send</button>
            </form>
        )
    }
}