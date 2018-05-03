import '../css/profile.css'
import axios from "axios/index";
import CheckAuth from "./CheckAuth"
var Link = require('react-router-dom').Link;
var React = require('react');

export default class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            profile: new Object(),
            Name: '',
            Surname: ''
        };
        this.HandleChange = this.HandleChange.bind(this);
    }

    componentDidMount() {
        CheckAuth.bind(this)();
        axios.get('api/profile')
            .then(res => {
                this.setState({ profile: res.data });
                console.log(res.data)
            })
    }

    handleSubmit = event => {
        event.preventDefault();

        var bodyFormData = new FormData();
        bodyFormData.set('Name', this.state.Name);
        bodyFormData.set('Surname', this.state.Surname);

        axios({
            method: 'post',
            url: '/api/editProfile',
            data: bodyFormData
        })
            .then(res => {
                alert(res.data);
            })
    };

    HandleChange(e) {
        console.log(this.state.Login)
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div className="Profile">
                <form onSubmit={this.handleSubmit} method="post">
                    <h2>Profile</h2>
                    <hr/>
                    <label>
                        Name:
                        <input type="text" name="Name" value={this.state.Name} onChange={this.HandleChange} placeholder={this.state.profile.name} required />
                    </label>
                    <label>
                        Surname:
                        <input type="text" name="Surname" value={this.state.Surname} onChange={this.HandleChange} placeholder={this.state.profile.surname} required />
                    </label>
                    <button type="submit">Send changes</button>
                </form>
            </div>
            )
    }
}