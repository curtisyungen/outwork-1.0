import React, { Component } from "react";
import "./weatherIcons.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudSun, faCloud, faCloudRain, faWind, faCloudShowersHeavy, faSnowflake, faWarehouse, faPooStorm, faMoon } from '@fortawesome/free-solid-svg-icons';

library.add(faSun, faCloudSun, faCloud, faCloudRain, faWind, faCloudShowersHeavy, faSnowflake, faWarehouse, faPooStorm, faMoon);

class WeatherIcons extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            selected: this.props.selected,
        });
    }

    render() {
        return (
            <div>
                <div
                    className={`weatherBtn sunny-${this.props.selected === "Sunny"}`}
                    onClick={this.props.setWeather.bind(null, "Sunny")}
                >
                    <FontAwesomeIcon className="icon fa-2x" icon={faSun} />
                </div>
                <div
                    className={`weatherBtn clear-${this.props.selected === "Clear"}`}
                    onClick={this.props.setWeather.bind(null, "Clear")}
                >
                    <FontAwesomeIcon className="icon fa-2x" icon={faCloudSun} />
                </div>
                <div
                    className={`weatherBtn cloudy-${this.props.selected === "Cloudy"}`}
                    onClick={this.props.setWeather.bind(null, "Cloudy")}
                >
                    <FontAwesomeIcon className="icon fa-2x" icon={faCloud} />
                </div>
                <div
                    className={`weatherBtn windy-${this.props.selected === "Windy"}`}
                    onClick={this.props.setWeather.bind(null, "Windy")}
                >
                    <FontAwesomeIcon className="icon fa-2x" icon={faWind} />
                </div>
                <div
                    className={`weatherBtn lightRain-${this.props.selected === "Light Rain"}`}
                    onClick={this.props.setWeather.bind(null, "Light Rain")}
                >
                    <FontAwesomeIcon className="icon fa-2x" icon={faCloudRain} />
                </div>
                <div
                    className={`weatherBtn heavyRain-${this.props.selected === "Heavy Rain"}`}
                    onClick={this.props.setWeather.bind(null, "Heavy Rain")}
                >
                    <FontAwesomeIcon className="icon fa-2x" icon={faCloudShowersHeavy} />
                </div>
                <div
                    className={`weatherBtn snowy-${this.props.selected === "Snowy"}`}
                    onClick={this.props.setWeather.bind(null, "Snowy")}
                >
                    <FontAwesomeIcon className="icon fa-2x" icon={faSnowflake} />
                </div>
                <div
                    className={`weatherBtn indoor-${this.props.selected === "Indoor"}`}
                    onClick={this.props.setWeather.bind(null, "Indoor")}
                >
                    <FontAwesomeIcon className="icon fa-2x" icon={faWarehouse} />
                </div>
                <div
                    className={`weatherBtn shitstorm-${this.props.selected === "Shitstorm"}`}
                    onClick={this.props.setWeather.bind(null, "Shitstorm")}
                >
                    <FontAwesomeIcon className="icon fa-2x" icon={faPooStorm} />
                </div>
                <div
                    className={`weatherBtn night-${this.props.selected === "Night"}`}
                    onClick={this.props.setWeather.bind(null, "Night")}
                >
                    <FontAwesomeIcon className="icon fa-2x" icon={faMoon} />
                </div>
            </div>
        )
    }
}

export default WeatherIcons;
