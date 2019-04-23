import firebase from 'firebase';


class dataStore {
  constructor() {
    const config = {
      apiKey: 'AIzaSyCcZmBDuR5ZzZ1c4qTTc1dgozPbx2sY-FY',
      authDomain: 'cs52-lab3-clkcalhoun.firebaseapp.com',
      databaseURL: 'https://cs52-lab3-clkcalhoun.firebaseio.com',
      projectId: 'cs52-lab3-clkcalhoun',
      storageBucket: 'cs52-lab3-clkcalhoun.appspot.com',
      messagingSenderId: '767852340274',
    };
    firebase.initializeApp(config);

    this.database = firebase.database();
  }

  fetchNotes(callback) {
    this.database.ref('notes').on('value', (snapshot) => {
      const newNoteState = snapshot.val();
      callback(newNoteState);
    });
  }

  updateNotes(fields, id) {
    this.database.ref('notes').child(id).update(fields);
  }

  deleteNote(id) {
    this.database.ref('notes').child(id).remove();
  }

  createNote(note) {
    this.database.ref('notes').push(note);
  }
}

export default dataStore;
