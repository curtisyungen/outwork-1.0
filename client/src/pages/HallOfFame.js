import React, { Component } from "react";
import hofAPI from "../utils/hofAPI";
import "./HallOfFame.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrophy, faBed, faRulerHorizontal,
    faMountain, faMedal, faDragon, faClock,
    faFlagCheckered, faCloudShowersHeavy, faFish, faHotdog
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faTrophy, faBed, faRulerHorizontal,
    faMountain, faMedal, faDragon, faClock,
    faFlagCheckered, faCloudShowersHeavy, faFish, faHotdog);

class HallOfFame extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            firstName: null,
            lastName: null,
            awards: null,
            hofLogo: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();
        // this.props.updateHof();

        let userId, firstName, lastName;

        if (this.props.profileId !== null) {
            userId = this.props.profileId;
            firstName = this.props.otherUserFirst;
            lastName = this.props.otherUserLast;
        }
        else {
            userId = localStorage.getItem("userId");
            firstName = localStorage.getItem("fn");
            lastName = localStorage.getItem("ln");
        }

        this.setState({
            userId: userId,
            firstName: firstName,
            lastName: lastName,
        }, () => {
            this.getHof();
            this.getHofLogo();
        });
    }

    getHof = () => {
        hofAPI.getHof()
            .then((res) => {
                let awards = [];

                for (var r in res.data) {
                    let award = {};
                    award.title = res.data[r].title;
                    award.icon = res.data[r].icon;
                    award.desc = res.data[r].desc;
                    award.userName = res.data[r].userName;
                    award.value = res.data[r].value;
                    award.unit = res.data[r].unit;

                    awards.push(award);
                }

                this.setState({
                    awards: awards,
                });
            });
    }

    getHofLogo = () => {
        let logos = [
            "http://nmshof.com//wp-content/uploads/2013/09/NMSHOF-2014-logo-web.png",
            "https://kysportshof.com/wp-content/themes/ky-hall-of-fame/img/kahof-logo.png",
            "https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/College_Football_Hall_of_Fame_logo.svg/1200px-College_Football_Hall_of_Fame_logo.svg.png",
            "https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Pro_Football_Hall_of_Fame_logo.svg/1200px-Pro_Football_Hall_of_Fame_logo.svg.png",
            "http://img1.wsimg.com/isteam/ip/07c0eb80-1bb1-4598-abd8-021a8704cd7c/49e3fd09-8ce1-4e9b-83c2-6472103e38da.png",
            "https://ungathletics.com/common/controls/image_handler.aspx?thumb_id=0&image_path=/images/2016/10/14/UNG_HOF_Logo2016.png",
            "https://umdearborn.edu/sites/default/files/styles/opengraph/public/group-library/341/athletics_hall_of_fame.png?itok=2mkwgrcg",
            "https://www.limusichalloffame.org/wp-content/uploads/2017/10/limhof-badge-v2.png",
            "https://www.womenofthehall.org/wp-content/themes/NWHoF/assets/imgs/logo-nwhof.png",
            "https://1190915.v1.pressablecdn.com/wp-content/uploads/2017/12/logo-white-outline.png",
            "https://dbukjj6eu5tsf.cloudfront.net/sidearm.sites/glenville.sidearmsports.com/images/2016/9/22/GSC_Curtis_Elam_Hall_of_Fame_71.jpg",
        ];

        let logoIdx = Math.floor(Math.random() * logos.length);

        this.setState({
            hofLogo: logos[logoIdx],
        });
    }

    getIcon = (iconRef) => {

        let icon;

        switch (iconRef) {
            case "faTrophy": icon = faTrophy; break;
            case "faBed": icon = faBed; break;
            case "faRulerHorizontal": icon = faRulerHorizontal; break;
            case "faMountain": icon = faMountain; break;
            case "faMedal": icon = faMedal; break;
            case "faDragon": icon = faDragon; break;
            case "faClock": icon = faClock; break;
            case "faFlagCheckered": icon = faFlagCheckered; break;
            case "faCloudShowersHeavy": icon = faCloudShowersHeavy; break;
            case "faFish": icon = faFish; break;
            case "faHotdog": icon = faHotdog; break;
            default: icon = faTrophy;
        }

        return icon;
    }

    // HALL OF FAME
    // ==================================

    render() {
        return (
            <div className="container pageContainer hofContainer">
                {/* <h4>Hall of Fame</h4> */}
                <div className="hofLogoDiv">
                    <img 
                        className="hofLogoImg"
                        src={this.state.hofLogo} 
                        alt="Hall of Fame" 
                    />
                </div>
                <div className="hallOfFame">
                    {this.state.awards && this.state.awards.length > 0 ? (
                        this.state.awards.map(award => (
                            <div className="hofMetric">
                                <div className="hofIcon hofCol"><FontAwesomeIcon className={`fa-2x ${award.icon}`} icon={this.getIcon(award.icon)} /></div>
                                <div className="hofTitle hofCol">{award.title}</div>
                                <div className="hofName hofCol">{award.userName}</div>
                                <div className="hofValue hofCol">{award.value}&nbsp;{award.unit}</div>
                                <div className="hofDesc hofCol">{award.desc}</div>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        )
    }
}

export default HallOfFame;
