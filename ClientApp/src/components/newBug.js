﻿import '../css/newBug.css'
import axios from "axios/index";
var Link = require('react-router-dom').Link;
var React = require('react');

export default class NewBug extends React.Component {

    render() {
        return (
            <form action="/newBug" method="post">
                <label>
                    Short description:
                    <input type="text" name="ShortDescr" placeholder="Type here..." />
                </label>
                <label>
                    Full description:
                    <input type="text" name="FullDescr" placeholder="Type here..." />
                </label>
                <label>
                    Urgency:
                    <select name="Urgency">
                        <option value="Very urgently" defaultValue>Very urgently</option>
                        <option value="Urgently">Urgently</option>
                        <option value="Do not rush">Do not rush</option>
                        <option value="Not at all urgently">Not at all urgently</option>
                        }
                    </select>
                </label>
                <label>
                    Criticality:
                    <select name="Criticality">
                        <option value="Emergency" defaultValue>Emergency</option>
                        <option value="Critical">Critical</option>
                        <option value="Uncritical">Uncritical</option>
                        <option value="Change request">Change request</option>
                        }
                    </select>
                </label>
                <button type="submit">Send</button>
                <br/>
                <Link to={"/bugList"}>Все ошибки</Link>
            </form>
        )
    }
}