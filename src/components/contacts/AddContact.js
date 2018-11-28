import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    //check for errors

    // if (name === "" || email === "" || phone === "") {
    //   this.setState({ errors: "is required" });
    //   return;
    // }

    if (name === "") {
      this.setState({ errors: { name: "is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "is required" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "is required" } });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );
    dispatch({ type: "ADD_CONTACT", payload: res.data });

    //clear state
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });
    //redirects to homepage after submitting a new contact
    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add a Contact</div>
              <form onSubmit={this.handleSubmit.bind(this, dispatch)}>
                <TextInputGroup
                  label="Name"
                  name="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={this.handleChange}
                  error={errors.name}
                />
                <TextInputGroup
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={this.handleChange}
                  error={errors.email}
                />
                <TextInputGroup
                  label="Phone"
                  name="phone"
                  placeholder="Enter phone"
                  value={phone}
                  onChange={this.handleChange}
                  error={errors.phone}
                />
                <input
                  type="submit"
                  value="Add Contact"
                  className="btn btn-light btn-block"
                />
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
