//import logo from './logo.svg';
import { useState, useEffect } from 'react';
//import axios from 'axios';
import './App.css';
import {Note} from './Note.js'
import { getAllNotes } from './services/notes/getAllNotes';
import { createNotes } from './services/notes/createNotes';
//import Message from './Message.js';

export const App = () =>{

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(()=> {
    
    setLoading(true);

    //con fetch se hace fetching de datos, para más avanzado usar axios (npm install axios)
    setTimeout( () => {
      /*fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        setNotes(json);
        setLoading(false);
      });*/

      getAllNotes().then((notes) => {
        setNotes(notes);
        setLoading(false);
        })  
      }, 2000);
    }, []);

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

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

  const loginHandleSubmit = (event) => {
    event.preventDefault();
    console.log('THIS IS SUBMITTTTT')


  }

  return (
    <>
      <h1>Notes</h1>
      {loading ? 'Cargando...' : ''}

      <form onSubmit={loginHandleSubmit}>
        <div>
          <input
            type='text'
            value={username}
            name='Username'
            placeholder='Username'
            onChange={ (event) => setUsername(event.target.value) }
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={ (event) => setPassword(event.target.value) }
          />
        </div>
        <button>
          Login
        </button>
      </form>

      <ol>
        {notes
        .map((note) =>   //el .map devuelve cada elemento del array
          <Note key={note.id} {...note} /> //la prop 'key siempre debe ir donde se itera'    
        )}
      </ol>
      
      <form onSubmit={handleSubmit}> {/* con el formulario funciona introducir el valor con intro */} 
        <input type='text' onChange={handleChange} value={newNote}/>
        <button>Crear nota</button> {/* el ultimo boton de un formulario funciona como submit por defecto */}
      </form>
      {error ? <small style={{color: 'red'}}>{error}</small> : ''}
    </>
  );
}

export default App;
