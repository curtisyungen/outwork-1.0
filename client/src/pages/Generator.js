import React, { Component } from "react";
import Equipment from "../components/Equipment/equipment";
import Workout from "../components/Workout/workout";
import Modal from "react-responsive-modal";
import userAPI from "../utils/userAPI";
import exerAPI from "../utils/exerAPI";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import "./Generator.css";

library.add(faTools);

class Generator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            firstName: null,
            lastName: null,
            difficulty: null,
            openModal: false,
            equipment: [],
            userEquipment: [],
            generate: false,
            confirm: false,
            timeString: "00:00:00",
        }
    }

    componentDidMount = () => {

        // Validate user and then call getUserById
        if (this.props.checkValidUser()) {
            let userId = localStorage.getItem("userId");

            userAPI.getUserById(userId)
                .then((res) => {
                    this.setState({
                        userId: userId,
                        firstName: res.data[0].firstName,
                        lastName: res.data[0].lastName,
                    }, () => {
                        this.getUserById();
                    });
                });
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    // Gets user data from database
    // Sets up user equipment list
    // Calls setEquipmentList to match user's equipment to items in master list
    getUserById = () => {
        userAPI.getUserById(this.state.userId)
            .then((res) => {
                let userEquipment = [];

                if (res.status === 200 && res.data[0].equipment) {
                    userEquipment = JSON.parse(res.data[0].equipment);
                }

                this.setState({
                    userEquipment: userEquipment,
                }, () => {
                    this.setEquipmentList(this.state.userEquipment);
                });
            });
    }

    // Gets master equipment list from database
    // Matches user's equipment to items in master equipment list
    setEquipmentList = (userEquipment) => {

        let equipment = [];
        exerAPI.getEquipment()
            .then((res) => {
                equipment = res.data;

                for (var e in equipment) {
                    if (userEquipment && userEquipment.indexOf(equipment[e].name) > -1) {
                        equipment[e].status = true;
                    }
                }

                this.setState({
                    equipment: equipment,
                });
            });
    }

    openModal = () => {
        this.setState({
            openModal: true,
        });
    }

    closeModal = () => {
        this.setState({
            openModal: false,
            confirm: false,
        }, () => {
            userAPI.updateEquipment(this.state.userId, JSON.stringify(this.state.userEquipment));
        });
    }

    // Toggles whether or not user owns specific piece of equipment
    toggleStatus = (name) => {
        let equipment = this.state.equipment;
        let userEquipment = this.state.userEquipment;

        for (var e in equipment) {
            if (equipment[e].name === name) {
                equipment[e].status = !equipment[e].status;

                if (equipment[e].status) {
                    userEquipment.push(name);
                }
                else {
                    let idx;
                    for (var ue in userEquipment) {
                        if (userEquipment[ue] === name) {
                            idx = ue;
                            userEquipment.splice(idx, 1);
                        }
                    }
                }
            }
        }

        this.setState({
            equipment: equipment,
            userEquipment: userEquipment,
            generate: false,
        });
    }

    generateWorkout = () => {
        this.setState({
            generate: !this.state.generate,
        });
    }

    randomWorkout = () => {
        this.setState({
            generate: !this.state.generate,
            difficulty: Math.floor(Math.random() * 8) + 1,
        }, () => {
            window.location.reload();
        });
    }

    render() {
        return (
            <div className="container pageContainer generatorPage">

                {/* SELECT EQUIPMENT */}
                <div className="selectEquipDiv">
                    <button className="btn selectEquipment" onClick={this.openModal}><FontAwesomeIcon className="equipIcon fa-2x" icon={faTools} /></button>
                </div>

                {/* EQUIPMENT MODAL */}
                {this.state.openModal ? (

                    <Modal
                        open={this.state.openModal}
                        onClose={this.closeModal}
                    >
                        <h4 className="equipTitle lead">Select the equipment you own.</h4>
                        <p class="equipSubtitle lead">This will filter the exercises generated.</p>
                        <div className="">
                            {this.state.equipment.map(equipment => (
                                <Equipment
                                    key={Math.random() * 100000}
                                    id={equipment.id}
                                    name={equipment.name}
                                    status={equipment.status}
                                    toggleStatus={this.toggleStatus}
                                />
                            ))}
                        </div>
                    </Modal>
                ) : (
                    <></>
                )}

                <div className={`difficultyBar`}>

                    <h4>Generator</h4>

                    {/* SELECT DIFFICULTY */}
                    <div className="input-group mb-0">
                        <select
                            className="browser-default custom-select"
                            autoComplete="off"
                            name="difficulty"
                            type="text"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={this.handleInputChange}
                            defaultValue={this.props.difficulty || "0"}
                        >
                            <option value="0">Select Difficulty</option>
                            <option value="1">Baby</option>
                            <option value="2">Easy</option>
                            <option value="3">Average</option>
                            <option value="4">Superior</option>
                            <option value="5">Hero</option>
                            <option value="6">Superman</option>
                            <option value="7">Rogan</option>
                            <option value="8">Goggins</option>
                        </select>
                        <div className="input-group-append">
                            <button className="btn btn-dark" onClick={this.generateWorkout}>Generate</button>
                            <button className="btn btn-secondary" onClick={this.randomWorkout}>Random</button>
                        </div>
                    </div>

                    {/* WORKOUT */}
                    <Workout
                        userId={this.state.userId}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        generate={this.state.generate}
                        userEquipment={this.state.userEquipment}
                        difficulty={this.state.difficulty}
                        timeString={this.state.timeString}
                        checkValidUser={this.props.checkValidUser}
                    />
                </div>
            </div >
        )
    }
}

export default Generator;