import '../css/newBug.css'
var React = require('react');

export default class newBug extends React.Component {

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
                        <option value="Very urgently" selected>Very urgently</option>
                        <option value="Urgently" selected>Urgently</option>
                        <option value="Do not rush" selected>Do not rush</option>
                        <option value="Not at all urgently" selected>Not at all urgently</option>
                        }
                    </select>
                </label>
                <label>
                    Criticality:
                    <select name="Criticality">
                        <option value="Emergency" selected>Emergency</option>
                        <option value="Critical" selected>Critical</option>
                        <option value="Uncritical" selected>Uncritical</option>
                        <option value="Change request" selected>Change request</option>
                        }
                    </select>
                </label>
                <button type="submit">Send</button>
            </form>
        )
    }
}