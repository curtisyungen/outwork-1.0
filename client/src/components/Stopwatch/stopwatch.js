import React, { Component } from "react";
import "./stopwatch.css";

class Stopwatch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            seconds: null,
            timeString: null,
            status: "inactive",
        }
    }

    componentDidMount = () => {
        this.setState({
            seconds: 0,
            timeString: "00:00:00",
            status: this.props.timeStatus,
        });
    }

    startWatch = () => {

        this.setState({
            status: "active",
        }, () => {
            this.runWatch();
        });
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

        this.setState({
            status: "inactive",
        });
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
        }, () => {
            this.props.recordTime(this.state.timeString);
        });
    }

    render() {
        return (
            <div className={`stopwatch watch-${this.state.status} mb-0`}>

                <div className="timeString">
                    {this.state.timeString}
                </div>

                <div className="stopwatchBtns">
                    <button 
                        className="btn btn-outline-dark btn-sm startWatchBtn"
                        onClick={this.startWatch}
                    >
                        Start
                    </button>
                    <button
                        className="btn btn-outline-dark btn-sm stopWatchBtn"
                        onClick={this.stopWatch}
                    >
                        Stop
                    </button>
                    <button
                        className="btn btn-outline-dark btn-sm resetWatchBtn"
                        onClick={this.resetWatch}
                    >
                        Reset
                    </button>
                </div>
            </div>
        )
    }
}

export default Stopwatch;