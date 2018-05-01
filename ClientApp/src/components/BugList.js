import axios from "axios/index";
import '../css/BugList.css';
var React = require('react');
var Link = require('react-router-dom').Link;

export default class BugList extends React.Component {

    constructor() {
        super();
        this.state = {
            bugs: new Array(),
            forIdSort: 1,  //Первоначально по возрастанию будет сортироваться
            forDateSort: 1
        };
        this.getBugs = this.getBugs.bind(this);
        this.forIdSort = this.forIdSort.bind(this);
        this.sortBugsById = this.sortBugsById.bind(this);
        this.forDateSort = this.forDateSort.bind(this);
        this.sortBugsByDate = this.sortBugsByDate.bind(this);
        this.SortIdStrelka = this.SortIdStrelka.bind(this);
        this.SortDateStrelka = this.SortDateStrelka.bind(this);
    }

    componentDidMount() {
        axios.get('api/getBugs')
            .then(res => {
                let dates = Object.values(res.data).map((dat) => {
                    dat.date = (new Date(dat.date)).toString()
                });
                this.forIdSort(res.data)
                //this.forDateSort(res.data)
                this.setState({ bugs: res.data });
            })
    }

    forIdSort(array) {      //Для сортировки по id
        array.sort(this.sortBugsById);
        this.setState({ forIdSort: this.state.forIdSort*(-1) })
    }

    sortBugsById(bugA, bugB) {      //Сортировка по id
        return this.state.forIdSort*(bugA.bugId - bugB.bugId);
    }

    forDateSort(array) {      //Для сортировки по date
        array.sort(this.sortBugsByDate);
        this.setState({ forDateSort: this.state.forDateSort * (-1) })
    }

    sortBugsByDate(bugA, bugB) {      //Сортировка по date
        var dA = new Date();
        var dB = new Date();
        dA.setTime(Date.parse(bugA.date));
        dB.setTime(Date.parse(bugB.date));
        return this.state.forDateSort*(dA - dB);
    }

    getBugs() {
        let bugs = Object.values(this.state.bugs).map((bug) => {
            var date = new Date();
            date.setTime(Date.parse(bug.date));
            date = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

            var edit;
            if (bug.status != "Closed")
                edit = (<Link to={"../editBug/" + bug.bugId}>Edit</Link>)
            else
                edit = (<Link to={"../editBug/" + bug.bugId}>View</Link>)

            return (
                <React.Fragment>
                    <tr>
                        <td>{bug.bugId}</td>
                        <td>{date}</td>
                        <td>{bug.shortDescr}</td>
                        <td>{bug.fullDescr}</td>
                        <td>{bug.status}</td>
                        <td>{bug.urgency}</td>
                        <th>{edit}</th>
                    </tr>
                </React.Fragment>
            );
        });

        return bugs;
    }


    SortIdStrelka() {
        if (this.state.forIdSort == 1)
            return (<nav className='sortArrow' onClick={() => this.forIdSort(this.state.bugs)}>\/</nav>)
        else
            return (<nav className='sortArrow' onClick={() => this.forIdSort(this.state.bugs)}>/\</nav>)
    }

    SortDateStrelka() {
        if (this.state.forDateSort == 1)
            return (<nav className='sortArrow' onClick={() => this.forDateSort(this.state.bugs)}>\/</nav>)
        else
            return (<nav className='sortArrow' onClick={() => this.forDateSort(this.state.bugs)}>/\</nav>)
    }


    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id {this.SortIdStrelka()}</th>
                            <th>Date {this.SortDateStrelka()}</th>
                            <th>Short description</th>
                            <th>Full description</th>
                            <th>status</th>
                            <th>urgency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getBugs()}
                    </tbody>
                </table>
            </div>
        )
    }
}