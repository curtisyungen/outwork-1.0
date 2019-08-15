import React, { Component } from "react";
import "./setItem.css";

class SetItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            actualReps: "",
            weight: "",
            rest: "",
            notes: "",
            count: 0,
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.id,
            actualReps: this.props.actualReps || "",
            weight: this.props.weight || "",
            rest: this.props.rest || "",
            notes: this.props.notes || "",
        });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    updateParent = () => {
        if (this.state.actualReps !== null) {
            this.props.setActualReps(this.props.id, this.props.assignName, this.state.actualReps);
        }

        if (this.state.weight !== null) {
            this.props.setWeight(this.props.id, this.props.assignName, this.state.weight);
        }

        if (this.state.rest !== null) {
            this.props.setRest(this.props.id, this.props.assignName, this.state.rest);
        }

        if (this.state.notes !== null) {
            this.props.setNotes(this.props.id, this.props.assignName, this.state.notes);
        }
    }

    handleExcuse = () => {
        let count = this.state.count;

        let quotes = [
            "Get your fuckin' shit on and stop being a punk!",
            "Quit being a baby! Get out there and run!",
            "Too busy? We're all busy! Learn how to manage your time!",
            "Tired? Waa! Waa! Get out there and quit being a sissy!",
            "Your leg hurts? Poor baby. More like you just want to quit!",
            "Bad weather? That's a weak excuse! Don't puss out on me!",
            "Don't feel good? Good! Now get your shit on and run!",
            "Quit being soft!",
        ];

        alert(quotes[count]);
        count += 1;

        if (count === quotes.length) {
            count = 0;
        }

        this.setState({
            count: count,
        });
    }

    render() {
        return (
            <div className={`setItem`}>
                <a
                    className="exName"
                    href={`https://www.youtube.com/results?search_query=how+to+do+${this.props.assignName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {this.props.assignName}
                </a>

                <div className="exReps">
                    {this.props.assignReps}
                </div>

                {/* ID 999 is the Goggins run */}
                {this.props.id !== 999 ? (

                <div className={`exActual saved-${this.state.saved}`}>
                    {/* ACTUAL REPS */}
                    <input
                        autoComplete="off"
                        name="actualReps"
                        type="text"
                        className="form-control actualData"
                        placeholder="Reps"
                        onChange={this.handleInputChange}
                        onBlur={this.updateParent}
                        // defaultValue={this.state.actualReps}
                        value={this.state.actualReps}
                    />
                    {/* WEIGHT */}
                    <input
                        autoComplete="off"
                        name="weight"
                        type="text"
                        className="form-control actualData"
                        placeholder="Lbs."
                        onChange={this.handleInputChange}
                        onBlur={this.updateParent}
                        // defaultValue={this.state.weight}
                        value={this.state.weight}
                    />
                    {/* REST */}
                    <input
                        autoComplete="off"
                        name="rest"
                        type="text"
                        className="form-control actualData"
                        placeholder="Rest"
                        onChange={this.handleInputChange}
                        onBlur={this.updateParent}
                        // defaultValue={this.state.rest}
                        value={this.state.rest}
                    />
                    {/* NOTES */}
                    <input
                        autoComplete="off"
                        name="notes"
                        type="text"
                        className="form-control actualData"
                        placeholder="Notes"
                        onChange={this.handleInputChange}
                        onBlur={this.updateParent}
                        // defaultValue={this.state.notes}
                        value={this.state.notes}
                    />
                </div>
                ) : (
                    <span>
                        <button 
                            className="btn btn-outline-success btn-sm gogginsRunBtn"
                            onClick={this.props.completeGoggins}
                        >
                            Roger that.
                        </button>
                        <a
                            className="btn btn-outline-dark btn-sm gogginsRunBtn"
                            href="https://www.youtube.com/watch?v=PNaTy5K4Pr0"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Video
                        </a>
                        <button 
                            className="btn btn-outline-danger btn-sm gogginsRunBtn"
                            onClick={this.handleExcuse}
                        >
                            Make Excuse
                        </button>
                        {/* <span className="disclaimer-xs">Click when complete.</span> */}
                    </span>
                )}
            </div>
        )
    }
}

export default SetItem;