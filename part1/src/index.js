import React from 'react'
import ReactDOM from 'react-dom'
//import Note from './Note.js'  //al exportar como default se puede llamar como quiera
import {Note} from './Note.js'  //al exportar como nombrado hay que poner las {} BUENA PRACTICA

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
]


const App = () => {   //Primero comprobamos que notes sea un array y que no esté vacío
  if(typeof notes === 'undefined' || notes.length === 0){
    return 'No tenemos notas que mostrar'
  }
  /*usa 'index' en el map sería una mala práctica porque no garantiza in 'ID' único*/
  return (
    <ul>
      {notes.map((note) => {  //el .map devuelve cada elemento del array
          return <Note key={note.id} {...note} /> //la prop 'key siempre debe ir donde se itera'
      }    
      )}
    </ul>
  )
}

ReactDOM.render(<App notes={notes} />, document.getElementById('root'))