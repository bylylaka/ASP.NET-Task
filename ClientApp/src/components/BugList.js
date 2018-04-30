import axios from "axios/index";
import '../css/BugList.css';
var React = require('react');

export default class BugList extends React.Component {

    constructor() {
        super();
        this.state = {
            bugs: new Array()
        };
        this.getBugs = this.getBugs.bind(this);
        this.sortBugs = this.sortBugsById.bind(this);
    }

    componentDidMount() {
        axios.get('api/getBugs')
            .then(res => {
                res.data.sort(this.sortBugsById);
                this.setState({ bugs: res.data });
            })
    }

    sortBugsById(bugA, bugB) {      //Сортировка по id
        return bugA.bugId - bugB.bugId;
    }

    sortBugsByDate(bugA, bugB) {      //Сортировка по date
        return bugA.date - bugB.date;
    }

    getBugs() {
        let bugs = Object.values(this.state.bugs).map((bug) => {
            return (
                <React.Fragment>
                    <tr>
                        <td>{bug.bugId}</td>
                        <td>{bug.date}</td>
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


    render() {
        if (this.state.bugs[0] != null) {
            console.log(this.state.bugs[0].date)
        }

        return (
            <div>
                <table>
                    <tbody>
                        {this.getBugs()}
                    </tbody>
                </table>
            </div>
        )
    }
}