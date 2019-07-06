import React, { Component } from "react";
// import Container from "../components/Container/container";
import Equipment from "../components/Equipment/equipment";
import Modal from "react-responsive-modal";
import userAPI from "../utils/userAPI";
// import "./Generator.css";

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
        this.props.checkValidUser();

        let userId = localStorage.getItem("userId");
        this.setState({
            userId: userId,
        }, () => {
            this.getUserById();
        });        
    }

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

    setEquipmentList = (userEquipment) => {
        let equipment = [
            {
                id: 1,
                name: "Kettle Bell",
                status: false,
            },
            {
                id: 2,
                name: "Weight Vest",
                status: false,
            },
            {
                id: 3,
                name: "Pull-Up Bar",
                status: false,
            },
            {
                id: 4,
                name: "Dumbbells",
                status: false,
            },
            {
                id: 5,
                name: "Barbell",
                status: false,
            },
            {
                id: 6,
                name: "Ab Roller",
                status: false,
            },
            {
                id: 7,
                name: "Exercise Band",
                status: false,
            },
            {
                id: 8,
                name: "Dip Rack",
                status: false,
            },
        ]

        for (var e in equipment) {
            if (userEquipment && userEquipment.indexOf(equipment[e].name) > -1) {
                equipment[e].status = true;
            }
        }

        this.setState({
            equipment: equipment,
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
        });
    }
    
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
        }, () => {
            userAPI.updateEquipment(this.state.userId, JSON.stringify(this.state.userEquipment))
                .then((res) => {
                    console.log("User equip", this.state.userEquipment);
                });
        });
    }

    render() {
        return (
            <span>
                <div>
                    <button className="btn btn-primary" onClick={this.openModal}>Select Equipment</button>
                </div>

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
            </span>
        )
    }
}

export default Generator;