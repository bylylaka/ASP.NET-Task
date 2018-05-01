import '../css/editBug.css'
import axios from "axios/index";
var React = require('react');

export default class EditBug extends React.Component {

    constructor() {
        super();
        this.state = {
            bug: null,
            historys: new Array()
        };
        this.getHistory = this.getHistory.bind(this);
    }

    componentDidMount() {
        const { bug } = this.props.match.params;

        axios.all([
            axios.get('api/getBug/' + bug),
            axios.get('api/getHistoty/' + bug),
        ])
            .then(axios.spread((bug, history) => {
                this.setState({ bug: bug.data })//Если не нашёл, то null

                let dates = Object.values(history.data).map((dat) => {
                    dat.date = (new Date(dat.date)).toString()
                });
                this.setState({ historys: history.data })

                console.log(this.state.historys)
            }))
            .catch(error => console.log(error));
    }

    getBugs() {
        let bugs = Object.values(this.state.bugs).map((bug) => {
            var date = new Date();
            date.setTime(Date.parse(bug.date));
            date = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

            return (
                <React.Fragment>
                    <tr>
                        <td>{bug.bugId}</td>
                        <td>{date}</td>
                        <td>{bug.shortDescr}</td>
                        <td>{bug.fullDescr}</td>
                        <td>{bug.status}</td>
                        <td>{bug.urgency}</td>
                    </tr>
                </React.Fragment>
            );
        });
        return bugs;
    }

    getHistory() {
        let historys = Object.values(this.state.historys).map((history) => {
            var date = new Date();
            date.setTime(Date.parse(history.date));
            date = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

            return (
                <React.Fragment>
                    <tr>
                        <td>{history.comment}</td>
                        <td>{date}</td>
                        <td>{history.userAction}</td>
                        <td>{history.userId}</td>
                    </tr>
                </React.Fragment>
            );
        });
        return historys;
    }


    render() {
        if (this.state.bug != null) {
            var date = new Date();
            date.setTime(Date.parse(this.state.bug.date));
            date = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            return (
                <div className="editBug">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <td>Date</td>
                                <th>Short description</th>
                                <th>Full description</th>
                                <th>status</th>
                                <th>urgency</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.bug.bugId}</td>
                                <td>{date}</td>
                                <td>{this.state.bug.shortDescr}</td>
                                <td>{this.state.bug.fullDescr}</td>
                                <td>{this.state.bug.status}</td>
                                <td>{this.state.bug.urgency}</td>
                            </tr>
                        </tbody>
                    </table>




                    <form action={"api/cgangeBug/" + this.props.match.params.bug} method="post">
                        <label>
                            Comment:
                            <input type="text" name="Comment" placeholder="Type here..." required />
                        </label>
                        <label>
                            Status:
                            <select name="Status">
                                <option value="Opened" defaultValue>Opened</option>
                                <option value="Solved">Solved</option>
                                <option value="Closedh">Closed</option>
                            </select>
                        </label>
                        <button type="submit">Send</button>
                    </form>




                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Comment</th>
                                    <th>Date</th>
                                    <th>User action</th>
                                    <th>User id</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.getHistory()}
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
        else
            return (
                <div className="editBug">
                    go away!(
                </div>
            )
    }
}