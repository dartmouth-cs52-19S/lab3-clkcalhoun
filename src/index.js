import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
// import debounce from 'lodash.debounce';
import { Map } from 'immutable';
import AddNote from './components/AddNote';
import Note from './components/note';
import dataStore from './service/datastore';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Map(),
    };
    this.dataStore = new dataStore();
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount() {
    this.dataStore.fetchNotes((notes) => {
      this.setState({ notes: Map(notes) });
    });
  }

  onAdd(txt) {
    const note = {
      title: txt,
      text: '',
      x: 1,
      y: 1,
      zIndex: 0,
    };
    this.dataStore.createNote(note);
  }

  onDelete(id) {
    this.dataStore.deleteNote(id);
  }

  onUpdate(id, fields) {
    this.dataStore.updateNotes(fields, id);
  }


  render() {
    return (
      <div>
        <AddNote onSearchChange={this.onAdd} />
        <div id="notes">
          {this.state.notes.entrySeq().map(([id, note]) => {
            return (
              <Note id={id} note={note} onDeleteClick={this.onDelete} onUpdateHandle={this.onUpdate} />
            );
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
