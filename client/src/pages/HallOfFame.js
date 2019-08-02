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
            "https://i2.wp.com/flwomenshalloffame.org/wp-content/uploads/2017/09/wine-logo-revised.jpg?fit=862%2C527&ssl=1",
            "https://1190915.v1.pressablecdn.com/wp-content/uploads/2017/12/logo-white-outline.png",
            "https://dbukjj6eu5tsf.cloudfront.net/sidearm.sites/glenville.sidearmsports.com/images/2016/9/22/GSC_Curtis_Elam_Hall_of_Fame_71.jpg",
            "https://chambermaster.blob.core.windows.net/userfiles/UserFiles/chambers/719/CMS/Hall-of-Fame-Logo.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Country_Music_Hall_of_Fame_logo.svg/1200px-Country_Music_Hall_of_Fame_logo.svg.png",
            "https://music.missouri.edu/sites/default/files/event-img/junior_honor_band_logo.png",
            "https://images.squarespace-cdn.com/content/5af2084a85ede1521a2990fa/1530807908955-PXU0EDB52ANHVLJI06TY/logo_red.png?content-type=image%2Fpng",
            "https://www.mdsahof.com/assets/site/msahf.png",
            "http://garyhayescountry.com/wp-content/uploads/2018/05/BGM.jpg",
            "http://www.coaaa.org/cms/images/HOF/HOF_2019/Inductee-Group-Photo_2019.jpg",
            "https://upload.wikimedia.org/wikipedia/en/thumb/0/09/ICC_Hall_Of_Fame.svg/981px-ICC_Hall_Of_Fame.svg.png",
            "https://www.bakemag.com/ext/resources/images/b/a/k/i/n/e/m/a/a/f/2017/BakingHallofFame.jpg",
            "https://www.bowlingmuseum.com/portals/0/images/HomepageBuckets/IBMHOFLogo.png",
            "http://mynssa.nssa-nsca.org/wp-content/uploads/sites/6/2010/08/NSSA-HoF-Logo-2018.jpg",
            "https://i.pinimg.com/originals/de/ce/ec/deceec0d604d4245aa48d7898d39231d.png",
            "https://naturallycaron.files.wordpress.com/2011/08/crochet-hof-logo.jpg",
            "http://www.fiebredegolf.com/wp-content/uploads/2016/03/Salo%CC%81n-de-la-Fama-del-Golf-Logo.jpg",
            "http://www.madisonbulldogs.org/_/rsrc/1368580498732/hall-of-fame/HOF.jpg?height=400&width=400",
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/64ecef39-bee4-4348-aee6-0909c8bcfa5f/dd1c0zj-e62723ed-a70e-4651-8136-4aff0d22495b.png/v1/fill/w_1082,h_739,strp/wwe_hall_of_fame_2019_logo_png_by_thebigdog1996_dd1c0zj-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODIwIiwicGF0aCI6IlwvZlwvNjRlY2VmMzktYmVlNC00MzQ4LWFlZTYtMDkwOWM4YmNmYTVmXC9kZDFjMHpqLWU2MjcyM2VkLWE3MGUtNDY1MS04MTM2LTRhZmYwZDIyNDk1Yi5wbmciLCJ3aWR0aCI6Ijw9MTIwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.L34KLGrQ87cnkshHhSBWHdiejnIZyAMrHPJgwgQIkRg",
            "http://nationalcomedyhalloffame.com/wp-content/uploads/2018/12/Embossed-Circle-Logo.png",
            "https://s3.amazonaws.com/swac.org/images/2018/8/3/swac_hof.jpg",
            "https://halloffame.outreach.ou.edu/media/filer_public/2c/4f/2c4ff43e-1352-4bc9-82c5-cf637a6e074f/hof_logo_print_white.png",
            "https://uillinois_microsites.sidearmsports.com/halloffame/img/halloffame/illinois-halloffame-logo.png",
            "https://www.uslacrosse.org/sites/default/files/public/images/logos/hall-of-fame-trans.png",
            "https://www.galioninquirer.com/wp-content/uploads/sites/38/2018/01/Sports-Hall-of-Fame-2.png",
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
                            <div key={award.title} className="hofMetric">
                                <div className="hofIcon hofCol"><FontAwesomeIcon className={`fa-2x ${award.icon}`} icon={this.getIcon(award.icon)} /></div>
                                <div className="hofTitle hofCol">{award.title}</div>
                                <div className="hofName hofCol">{award.userName}</div>
                                <div className="hofValue hofCol">{Math.round((award.value * 100) / 100)}&nbsp;{award.unit}</div>
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
