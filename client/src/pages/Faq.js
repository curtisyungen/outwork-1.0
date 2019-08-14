import React, { Component } from "react";
import "./Faq.css";

class Faq extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();

    }

    render() {
        return (
            <div className="container pageContainer faqContainer">
                
                <div className="inWork">
                    <h4>Outwork In Work</h4>
                    <div className="iw">08/13/2019: Adding bar chart for visualizing weekly running mileage.</div>
                    <div className="iw">08/13/2019: Making muscle group names consistent between Lift and Generator submissions ("legs" vs. "quadriceps").</div>
                </div>
                
                <div className="questions">
                    <h4>Frequently Asked Questions</h4>
                    <div className="qaDiv">
                        <div className="q">Q: What was the inspiration behind the name Outwork?</div>
                        <div className="a">
                            A: It's an obvious play on the word "workout". In fact, the name itself inspired the Hall of Fame,
                            which aims to inspire users to outwork each other or simply outwork their earlier selves.
                        </div>
                    </div>

                    <div className="qaDiv">
                        <div className="q">Q: How is the Champ of the Week award determined?</div>
                        <div className="a">
                            A: It's based on weekly stats for most workouts, most push-ups, most pull-ups,
                            most time spent working out, and most elevation climbed during runs.
                        </div>
                    </div>

                    <div className="qaDiv">
                        <div className="q">Q: How do you win the weiner award?</div>
                        <div className="a">A: Trade secret. Rest assured that everyone has an equal opportunity to win the coveted Weiner Award!</div>
                    </div>

                    <div className="qaDiv">
                        <div className="q">Q: What are bad weather days?</div>
                        <div className="a">A: Bad weather is considered light rain, heavy rain, snow, or shitstorm weather. Each counts toward winning the Storm Chaser award.</div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Faq;