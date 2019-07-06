import React, { Component } from "react";
// import Container from "../components/Container/container";
import Equipment from "../components/Equipment/equipment";
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
                <div class="btn-group" role="group" aria-label="Difficulty">
                    <button type="button" class="btn btn-secondary btn-sm baby">Baby</button>
                    <button type="button" class="btn btn-secondary btn-sm easy">Easy</button>
                    <button type="button" class="btn btn-secondary btn-sm average">Average</button>
                    <button type="button" class="btn btn-secondary btn-sm superior">Superior</button>
                    <button type="button" class="btn btn-secondary btn-sm hero">Hero</button>
                    <button type="button" class="btn btn-secondary btn-sm superman">Superman</button>
                    <button type="button" class="btn btn-secondary btn-sm rogan">Rogan</button>
                    <button type="button" class="btn btn-secondary btn-sm goggins">Goggins</button>
                </div>
                
            </span>
        )
    }
}

export default Generator;