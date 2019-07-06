import React, { Component } from "react";
// import Container from "../components/Container/container";
import Equipment from "../components/Equipment/equipment";
import Workout from "../components/Workout/workout";
import Modal from "react-responsive-modal";
import userAPI from "../utils/userAPI";
import exerAPI from "../utils/exerAPI";
import "./Generator.css";

class Generator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            openModal: false,
            equipment: [],
            userEquipment: [],
            difficulty: null,
            generate: false,
        }
    }

    componentDidMount = () => {

        // Validate user and then call getUserById
        if (this.props.checkValidUser()) {
            let userId = localStorage.getItem("userId");
            this.setState({
                userId: userId,
            }, () => {
                this.getUserById();
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

    render() {
        return (
            <span>

                {/* SELECT EQUIPMENT */}
                <div>
                    <button className="btn btn-primary" onClick={this.openModal}>Select Equipment</button>
                </div>

                {/* EQUIPMENT MODAL */}
                {this.state.openModal ? (

                <Modal
                    open={this.state.openModal}
                    onClose={this.closeModal}
                >
                    <div className="col-md-12">
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

                {/* SELECT DIFFICULTY */}
                <div className="col-md-4 input-group input-group-sm mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Difficulty</span>
                    </div>
                    <select
                        className="browser-default custom-select"
                        autoComplete="off"
                        name="difficulty"
                        type="text"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={this.handleInputChange}
                        defaultValue={null}
                    >
                        <option value="0"></option>
                        <option value="1">Baby</option>
                        <option value="2">Easy</option>
                        <option value="3">Average</option>
                        <option value="4">Superior</option>
                        <option value="5">Hero</option>
                        <option value="6">Superman</option>
                        <option value="7">Rogan</option>
                        <option value="8">Goggins</option>
                    </select>
                </div>

                {/* GENERATE WORKOUT */}
                <div>
                    <button className="btn btn-primary" onClick={this.generateWorkout}>Generate</button>
                </div>

                <Workout 
                    generate={this.state.generate}
                    userEquipment={this.state.userEquipment}
                    difficulty={this.state.difficulty}
                />
                
            </span>
        )
    }
}

export default Generator;