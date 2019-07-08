import React, { Component } from "react";
// import Container from "../components/Container/container";
import User from "../components/User/user";
import userAPI from "../utils/userAPI";
// import "./FindUsers.css";

class FindUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userSearch: null,
            users: null,
        }
    }

    componentDidMount = () => {
        this.props.checkValidUser();
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    searchForUser = (event) => {
        event.preventDefault();

        userAPI.searchForUser(this.state.userSearch)
            .then((res) => {
                this.setState({
                    users: res.data,
                });
            });
    }

    render() {
        return (
            <span>
                <div className="col-md-6 input-group mb-3">
                    <input 
                        name="userSearch" 
                        type="text" 
                        className="form-control" 
                        aria-describedby="basic-addon2" 
                        onChange={this.handleInputChange}
                    />
                    <div className="input-group-append">
                        <button 
                            className="btn btn-outline-secondary" 
                            type="button"
                            onClick={this.searchForUser}
                        >
                            Search
                        </button>
                    </div>
                </div>

                <div>
                    {this.state.users && this.state.users.length > 0 ? (
                        this.state.users.map(user => (
                            <User 
                                key={Math.random() * 100000}
                                firstName={user.firstName}
                                lastName={user.lastName}
                            />
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </span>
        )
    }
}

export default FindUsers;