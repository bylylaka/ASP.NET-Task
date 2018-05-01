import axios from "axios/index";
var React = require('react');

export default class EditBug extends React.Component {

    constructor() {
        super();
        this.state = {
            bug: null
        };
    }

    componentDidMount() {
        const { bug } = this.props.match.params;

        axios.get('api/getBug/'+bug)
            .then(res => {
                if (res.data != '')
                    this.setState({ bug: res.data })//Если не нашёл, то null
            })
    }

    render() {
        if (this.state.bug != null)
            return (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Short description</th>
                                <th>Full description</th>
                                <th>status</th>
                                <th>urgency</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.bug.bugId}</td>
                                <td>{this.state.bug.shortDescr}</td>
                                <td>{this.state.bug.fullDescr}</td>
                                <td>{this.state.bug.status}</td>
                                <td>{this.state.bug.urgency}</td>
                            </tr>
                        </tbody>
                    </table>





                    <form action="/newBug" method="post">
                        <label>
                            Comment:
                            <input type="text" name="Comment" placeholder="Type here..." />
                        </label>
                        <label>
                            Status:
                            //<select name="Status">
                            //            <option value="Very urgently" defaultValue>Very urgently</option>
                            //            <option value="Urgently">Urgently</option>
                            //            <option value="Do not rush">Do not rush</option>
                            //            <option value="Not at all urgently">Not at all urgently</option>
                            //</select>
                        </label>
                        <button type="submit">Send</button>
                    </form>
                </div>
            )
        else
            return (
                <div>
                    go away!(
                </div>
            )
    }
}