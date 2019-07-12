import React, { Component } from "react";
import "./stopwatch.css";

class Stopwatch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hours: null,
            minutes: null,
            seconds: null,
            active: false,
        }
    }

    componentDidMount = () => {
        this.setState({
            seconds: 0,
            active: false,
        });
    }

    startWatch = () => {
        setInterval(this.runWatch(), 1000);
    }

    runWatch = () => {

        let seconds = this.state.seconds;
        seconds += 1;

        this.setState({
            seconds: seconds,
        });
    }

    stopWatch = () => {

    }

    resetWatch = () => {
        this.setState({
            seconds: 0,
            active: false,
        });
    }

    render() {
        return (
            <div className="stopwatch">

                <div>
                    {this.state.seconds}
                </div>

                <button 
                    className="btn btn-success btn-sm startWatchBtn"
                    onClick={this.startWatch}
                >
                    Start
                </button>
                <button
                    className="btn btn-danger btn-sm stopWatchBtn"
                    onClick={this.stopWatch}
                >
                    Stop
                </button>
                <button
                    className="btn btn-dark btn-sm resetWatchBtn"
                    onClick={this.resetWatch}
                >
                    Reset
                </button>
            </div>
        )
    }
}

export default Stopwatch;