//import logo from './logo.svg';
import { useState, useEffect } from 'react';
//import axios from 'axios';
import './App.css';
//import { getAllNotes } from './services/notes/getAllNotes';
//import { createNotes } from './services/notes/createNotes';
//import Message from './Message.js';
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm.js'
import NoteForm from './components/NoteForm.js'

export const App = () =>{

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(()=> {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
    
    //con fetch se hace fetching de datos, para más avanzado usar axios (npm install axios)
    //setTimeout( () => {
      /*fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        setNotes(json);
        setLoading(false);
      });*/
      /*
      getAllNotes().then((notes) => {
        setNotes(notes);
        setLoading(false);
        })  
      }, 2000);*/
    }, []);

  const handleLogout = () => {
    setUser(null)
    noteService.setToken(null)
    window.localStorage.removeItem('loggedNoteAppUser')
  }  

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }    

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  /*
  const handleSubmit = (event) => {
    event.preventDefault(); //previene el comportamiento de refrescar del formulario por defecto
    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1
    };

    setError("");

    createNotes(noteToAddToState).then((newNote) => {
      setNotes(prevNotes => prevNotes.concat(newNote));
      })
      .catch((error) => {
        console.error(error);
        setError('La API ha fallado');
      })
    setNewNote('');
  };
  */
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
  
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(e) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <>
      <h1>Notes</h1>

      <Notification message = {errorMessage} />

      {
        user
          ? <NoteForm 
              addNote = {addNote}
              handleLogout = {handleLogout}
            />
          : <LoginForm
              username = {username}
              password = {password}
              handleUserNameChange = {
                ({target}) => setUsername(target.value)
              }
              handlePasswordChange = {
                ({target}) => setPassword(target.value)
              }
              handleSubmit = {handleLogin}
            />    
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map((note, i) =>   //el .map devuelve cada elemento del array
          <Note 
            key = {i} 
            note = {note}  //la prop 'key siempre debe ir donde se itera'
            toggleImportance={() => toggleImportanceOf(note.id)}
          />    
        )}
      </ul>
    </>
  )
}

export default App;
