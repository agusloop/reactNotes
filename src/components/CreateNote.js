import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";

import "react-datepicker/dist/react-datepicker.css";
registerLocale("Es", es);
setDefaultLocale("Es");
export default class CreateNote extends Component {
  state = {
    users: [],
    //UserSelected lo asigna al estado para ser guardado
    userSelected: "",
    title: "",
    content: "",
    startDate: new Date(),
    editing: false,
    _id: ""
  };

  async componentDidMount() {
    console.log("Hleoo " + this.props.match.params.id);
    const res = await axios.get("http://localhost:5000/users");
    //*La propiedad map nos permite recorrer nuestro objeto JSON en este caso se va ocupar para sacar el username
    this.setState({
      users: res.data.map(user => user.username),
      userSelected: res.data[0].username
    });
    if (this.props.match.params.id) {
      const res = await axios.get(
        "http://localhost:5000/notes/" + this.props.match.params.id
      );
      console.log(res.data);
      this.setState({
        title: res.data.titulo,
        content: res.data.contenido,
        date: res.data.date,
        userSelected: res.data.autor,
        editing: true,
        _id: this.props.match.params.id
      });
    }
  }
  handleChange = date => {
    //TODO:Pone en el input la fecha seleccionada
    this.setState({
      startDate: date
    });
    console.log(date);
  };
  /*
  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  ?::::::::::::::::::::: A G R E G A R   N O T A  ::::::::::::::::::::
   ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  */
  onSubmitNote = async e => {
    e.preventDefault();
    const newNote = {
      //*Lado izquierdo es nuestro backend  :::::: Lado derecho es como estan en el estado
      titulo: this.state.title,
      contenido: this.state.content,
      date: this.state.startDate,
      autor: this.state.userSelected
    };

    if (this.state.editing) {
      await axios.put("http://localhost:5000/notes/" + this.state._id, newNote);
    } else {
      await axios.post("http://localhost:5000/notes", newNote);
    }

    window.location.href = "/";
  };

  /*
  _____________________________
  TODO: EL onChange sirve para escuchar lo qu esta pasando en los inputs de lo formularios
  ::::::::::::::
  */

  onChangeInput = e => {
    //TODO:Esta línea jala al usuario y lo asigna al estado para que pueda ser guardado
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-body">
            <h4>Crea un Nota</h4>
            {/*
            -------------------------------
            *Seleccionar Multiples Usuarios
            -------------------------------

            */}
            <form onSubmit={this.onSubmitNote}>
              <div className="form-group">
                <select
                  className="form-control"
                  name="userSelected"
                  onChange={this.onChangeInput}
                  value={this.state.userSelected}
                >
                  {this.state.users.map(user => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Titulo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Titulo"
                  name="title"
                  required
                  onChange={this.onChangeInput}
                  value={this.state.title}
                ></input>
              </div>

              <div className="form-group">
                <label>Descripcion</label>
                <textarea
                  name="content"
                  className="form-control"
                  placeholder="Descripcion"
                  required
                  onChange={this.onChangeInput}
                  value={this.state.content}
                ></textarea>
              </div>

              <div className="form-group">
                <DatePicker
                  className="form-control"
                  locale="Es"
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  dateFormat="d MMMM, yyyy"
                />
              </div>

              <button type="submit" className="btn btn-outline-primary">
                Save Note
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
