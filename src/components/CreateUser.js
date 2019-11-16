import React, { Component } from "react";
//Nos va a permitir la comunicación con nuestro backend
import axios from "axios";

export default class CreateUser extends Component {
  state = {
    users: [],
    username: ""
  };

  async componentDidMount() {
    this.getUsers();
    console.log(this.state.users);
  }

  //para mostrar todos los usuarios
  getUsers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    this.setState({ users: res.data });
  };

  //para crear un nuevo usuario
  onSubmit = async e => {
    //Evita la recarga de la pagina el e.prevent
    e.preventDefault();
    await axios.post("http://localhost:5000/users", {
      username: this.state.username
    });
    //limpia el Cuadro de texto
    this.setState({ username: "" });
    this.getUsers();
  };

  /*--------------------------------
  -----------Eliminar Usuario-------------
  */
  deleteUser = async id => {
    await axios.delete("http://localhost:5000/users/" + id);
    this.getUsers();
  };

  onChangeUserName = e => {
    this.setState({
      username: e.target.value
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card bg-dark card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name=""
                  id=""
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUserName}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>

        <div className="col-md-8">
          <ul className="list-group">
            {this.state.users.map(user => (
              <li
                className="list-group-item list-group-item-action"
                key={user._id}
                onDoubleClick={() => this.deleteUser(user._id)}
              >
                {/* esto es como viene desde nuestro objeto json */}
                {user.username + user.createdAt}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
