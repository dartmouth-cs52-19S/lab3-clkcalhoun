import React, { Component } from 'react';
// import '../style.scss';

class AddNote extends Component {
  constructor(props) {
    super(props);

    this.state = { NewTitle: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onCreateClick = this.onCreateClick.bind(this);
  }

  onInputChange(event) {
    // this.props.onSearchChange(event.target.value);
    this.setState({ NewTitle: event.target.value });
    console.log(event.target.value);
  }

  onCreateClick(event) {
    this.props.onSearchChange(this.state.NewTitle);
  }


  render() {
    return (
      <form id="form" onSubmit={this.handleSubmit}>
        <label id="label" htmlFor="title">
        To-do (enter new note title):
          <input id="textinput" type="text" onChange={this.onInputChange} value={this.state.NewTitle} />
        </label>
        <input id="button" type="button" value="Create" onClick={this.onCreateClick} />
      </form>
    );
  }
}

export default AddNote;
