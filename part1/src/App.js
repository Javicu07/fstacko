//import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import {Note} from './Note.js'
//import Message from './Message.js';

export const App = () =>{

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    
    setLoading(true);

    setTimeout( () => {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        setNotes(json);
        setLoading(false);
      });
    }, 2000);
  }, [newNote]);

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //previene el comportamiento de refrescar del formulario por defecto
    const noteToAddToState = {
      id: notes.length + 1,
      title: newNote,
      body: newNote
    };

    setNotes([...notes, noteToAddToState]); //devuelve un array nuevo
    setNewNote('');
  };

  return (
    <>
      <h1>Notes</h1>
      {loading ? 'Cargando...' : ''}
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
    </>
  );
}

export default App;
