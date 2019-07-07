import React, { Component } from "react";
import "./set.css";

class Set extends Component {
    render() {
        return (
            <div className="set">
                <div>
                    <a
                        className="exName"
                        href={`https://www.youtube.com/results?search_query=how+to+do+${this.props.set[0].name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {this.props.set[0].name}
                    </a>
                    <span className="exReps">{this.props.set[0].reps}</span>
                </div>

                <div>
                    <a
                        className="exName"
                        href={`https://www.youtube.com/results?search_query=how+to+do+${this.props.set[1].name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {this.props.set[1].name}
                    </a>
                    <span className="exReps">{this.props.set[1].reps}</span>
                </div>

                <div>
                    <a
                        className="exName"
                        href={`https://www.youtube.com/results?search_query=how+to+do+${this.props.set[2].name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {this.props.set[2].name}
                    </a>
                    <span className="exReps">{this.props.set[2].reps}</span>
                </div>

                <div>
                    <a
                        className="exName"
                        href={`https://www.youtube.com/results?search_query=how+to+do+${this.props.set[3].name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {this.props.set[3].name}
                    </a>  
                    <span className="exReps">{this.props.set[3].reps}</span>
                </div>
        
                <div>
                    <a 
                        className="exName"
                        href={`https://www.youtube.com/results?search_query=how+to+do+${this.props.set[4].name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {this.props.set[4].name}
                    </a>  
                    <span className="exReps">{this.props.set[4].reps}</span>
                </div>
            </div>
        )
    }
}

export default Set;