import React, { Component } from "react";
import "./stopwatch.css";

class Stopwatch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            seconds: null,
            timeString: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            seconds: 0,
            timeString: "00:00:00",
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
            }, () => {
                this.formatTime();
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
            timeString: "00:00:00",
        });
    }

    formatTime = () => {
        let seconds = this.state.seconds;
        let hours, minutes;
        
        hours = Math.floor(seconds / 3600);
        minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds - (hours * 3600) - (minutes * 60));

        let addZeroHrs = (hours < 10) ? (0):("");
        let addZeroMins = (minutes < 10) ? (0):("");
        let addZeroSecs = (seconds < 10) ? (0):("");

        let timeString = `${addZeroHrs}${hours}:${addZeroMins}${minutes}:${addZeroSecs}${seconds}`;

        this.setState({
            timeString: timeString,
        });
    }

    render() {
        return (
            <div className="stopwatch">

                <div className="timeString">
                    {this.state.timeString}
                </div>

                <button 
                    className="btn btn-dark btn-sm startWatchBtn"
                    onClick={this.startWatch}
                >
                    Start
                </button>
                <button
                    className="btn btn-dark btn-sm stopWatchBtn"
                    onClick={this.stopWatch}
                >
                    Stop
                </button>
                <button
                    className="btn btn-light btn-sm resetWatchBtn"
                    onClick={this.resetWatch}
                >
                    Reset
                </button>
            </div>
        )
    }
}

export default Stopwatch;