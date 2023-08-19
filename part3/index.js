const http = require('http') //Common JS
//input http from 'http'    //ECMA_Script Modules

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
const app = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify(notes))
})

const PORT = 3000
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
