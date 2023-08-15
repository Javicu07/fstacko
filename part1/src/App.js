//import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import {Note} from './Note.js'
//import Message from './Message.js';



export const App = (props) =>{

  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  const handleShowAll = () => {
    setShowAll( ()=>!showAll );
  }

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); //previene el comportamiento de refrescar del formulario por defecto
    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    setNotes([...notes, noteToAddToState]); //devuelve un array nuevo
    setNewNote('');
  };

  if(typeof notes === 'undefined' || notes.length === 0) {
    return <p> No tenemos notas que mostrar </p>
    }
    /*usa 'index' en el map sería una mala práctica porque no garantiza in 'ID' único*/
  return (
    <>
      <h1>Notes</h1>
      <button onClick={handleShowAll}>{showAll ? 'Show only importants' : 'Show all'}</button>
      <ul>
        {notes
        .filter(note => {
          if (showAll === true) return true;
          return note.important === true;
        })
        .map((note) =>   //el .map devuelve cada elemento del array
          <Note key={note.id} {...note} /> //la prop 'key siempre debe ir donde se itera'    
        )}
      </ul>
      
      <form onSubmit={handleSubmit}> {/* con el formulario funciona introducir el valor con intro */} 
        <input type='text' onChange={handleChange} value={newNote}/>
        <button>Crear nota</button> {/* el ultimo boton de un formulario funciona como submit por defecto */}
      </form>
    </>
  );
}

export default App;
