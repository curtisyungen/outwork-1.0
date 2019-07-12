import React, { Component } from "react";
import "./stopwatch.css";

class Stopwatch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hours: null,
            minutes: null,
            seconds: null,
            timeString: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            seconds: 0,
        });
    }

    startWatch = () => {
        this.runWatch();
    }

    runWatch = () => {
        let timer = setInterval(() => {
            let seconds = this.state.seconds;
            seconds += 1;

            this.setState({
                seconds: seconds,
            });
        }, 1000);

        this.setState({
            timer: timer,
        });
    }

    stopWatch = () => {
        let timer = this.state.timer;
        clearInterval(timer);
    }

    resetWatch = () => {
        this.setState({
            seconds: 0,
        });
    }

    formatTime = () => {
        let seconds = this.state.seconds;
        let hours, minutes;
        
        hours = Math.floor(seconds / 3600);
        minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds - (minutes * 60) - (hours * 3600));

        let timeString = `${hours}:${minutes}:${seconds}`;

        this.setState({
            timeString: timeString,
        });
    }

    render() {
        return (
            <div className="stopwatch">

                <div>
                    {this.state.timeString}
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