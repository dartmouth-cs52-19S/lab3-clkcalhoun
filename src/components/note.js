import React, { Component } from 'react';
import Draggable from 'react-draggable'; // The default
import marked from 'marked';
import TextareaAutosize from 'react-textarea-autosize';
// import '../style.scss';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };

    this.onEditingClick = this.onEditingClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.renderSomeSection = this.renderSomeSection.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onEditTitle = this.onEditTitle.bind(this);
    this.onEditText = this.onEditText.bind(this);
    console.log(this.props);
  }


  // This edits the note
  onEditingClick() {
    if (this.state.isEditing) {
      this.setState({ isEditing: false });
    } else {
      this.setState({ isEditing: true });
    }
  }

  onDrag(event, currentPosition) {
    if (currentPosition !== undefined) {
      console.log(currentPosition);
      console.log(this.props.id);
      this.props.onUpdateHandle(this.props.id, { x: currentPosition.x, y: currentPosition.y });
    }
  }

  onEditTitle(event) {
    this.props.onUpdateHandle(this.props.id, { title: event.target.value });
  }

  onEditText(event) {
    this.props.onUpdateHandle(this.props.id, { text: event.target.value });
  }


  // This deletes the note
  onDeleteClick() {
    this.props.onDeleteClick(this.props.id);
  }

  // Render the note based on whether it is being edited
  renderSomeSection() {
    if (this.state.isEditing) {
      return (
        <div id="note">
          <div id="topbar">
            <h3 id="header"> {this.props.note.title}</h3>
            <div id="textarea">
              <TextareaAutosize id="textarea1" onChange={this.onEditTitle} value={this.props.note.title} />
            </div>
            <i role="button" tabIndex={0} onClick={this.onDeleteClick} className="fas fa-trash" />
            <i role="button" tabIndex={0} onClick={this.onEditingClick} className="fas fa-edit" />
            <i role="button" tabIndex={0} onClick={this.onDrag} className="class-of-note-mover-element fas fa-dragon" />
          </div>
          <div id="noteBody">
            <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
            <div id="textarea">
              <TextareaAutosize id="textarea2" onChange={this.onEditText} value={this.props.note.text} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="note">
          <div id="topbar">
            <h3 id="header"> {this.props.note.title}</h3>
            <i role="button" tabIndex={0} onClick={this.onDeleteClick} className="fas fa-trash" />
            <i role="button" tabIndex={0} onClick={this.onEditingClick} className="fas fa-edit" />
            <i role="button" tabIndex={0} onClick={this.onDrag} className="class-of-note-mover-element fas fa-dragon" />
          </div>
          <div id="noteBody">
            <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
          </div>
        </div>
      );
    }
  }

  // Call the render function to render the note
  render() {
    return (
      <div>
        <Draggable
          handle=".class-of-note-mover-element"
          grid={[25, 25]}
          defaultPosition={{ x: 20, y: 20 }}
          position={{ x: this.props.note.x, y: this.props.note.y }}
          onStart={this.onStartDrag}
          onDrag={this.onDrag}
          onStop={this.onStopDrag}
        >
          {this.renderSomeSection()}
        </Draggable>
      </div>
    );
  }
}

export default Note;
