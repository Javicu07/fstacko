//  const http = require('http') //Common JS
//  input http from 'http'    //ECMA_Script Modules

//  'express' simplify the code 'npm install express'
import express from 'express'
const app = express()


const notes = [
    {
        'id': 1,
        'content': 'I have to subscribe it',
        'date': '2019-05-30T17:30:31.098Z',
        'important': true
    },
    {
        'id': 2,
        'content': 'I have to study fullstack bootcamp´s class',
        'date': '2019-05-30T18:39:34.091Z',
        'important': false
    },
    {
        'id': 3,
        'content': 'Review the JS challenges',
        'date': '2019-05-30T19:20:14.298Z',
        'important': true
    }
];

//install nodemon auto-update the application for changes 'npm install nodemon -D'
//install the package not global, dependencies in the same project 
//A createServer se le pasa un 'callback'
//const app = http.createServer((request, response) => {
//    response.writeHead(200, {'Content-Type': 'application/json'})
//    response.end(JSON.stringify(notes))
//})

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log({id})
    const note = notes.find(note => note.id === id)
    console.log({note})
    if(note){ 
        response.json(note)
    }else{
        response.status(404).end()
    }
})

//  Tools to make 'delete' --> postman, insomnia, REST Client (extensión)
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

//const PORT = 3001
//app.listen(PORT)
//console.log(`Server running on port ${PORT}`)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})