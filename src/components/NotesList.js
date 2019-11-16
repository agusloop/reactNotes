import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
//TODO :::::: Se instala con npm install timeago.js
import TimeAgo from "react-timeago";
import es from "react-timeago/lib/language-strings/es";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

const formatter = buildFormatter(es);

export default class NotesList extends Component {
  /*
  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  ?::::::::::::::::::::: Lo primero es jalar los datos :::::::::::::::
  ?  ::::::::::::::::::: Entonces en el estado se asignan
   ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  */
  state = {
    notes: []
  };

  /*
  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  TODO :::::::::::::::::::::: Trabajar con el backend use el Did:::::::::::::::
   ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  */
  async componentDidMount() {
    this.getNotes();
  }

  //*SE hace esta funcion para poderla reutilizar
  async getNotes() {
    const res = await axios.get("http://localhost:5000/notes");
    this.setState({ notes: res.data });
  }

  onDeleteNote = async id => {
    await axios.delete("http://localhost:5000/notes/" + id);
    this.getNotes();
  };
  render() {
    return (
      <div className="row">
        {//*Despues del map! ¿Qué es lo que voy a devolver?
        this.state.notes.map(note => (
          <div className="col-md-4 p-2" key={note._id}>
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h5>{note.titulo}</h5>

                <Link className="btn btn-light" to={"/edit/" + note._id}>
                  Edit
                </Link>
              </div>
              <div className="card-body">
                <p>{note.contenido}</p>
                <p>{note.autor}</p>
                <p>
                  <TimeAgo date={note.date} formatter={formatter} />
                </p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-danger"
                  onClick={() => this.onDeleteNote(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
