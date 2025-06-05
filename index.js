const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const app = express()

// Middleware
app.use(express.static('build'))  // Primero servimos los archivos estáticos
app.use(cors())  // Luego CORS para las peticiones API
app.use(express.json())  // Por último, el parsing de JSON

// Configuración de Morgan para logging
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const fechaActual = () =>{
    const fecha = new Date()
    return fecha
}

const generateId = () => {
    const id = Math.floor(Math.random()*1000000)
    return id
}

app.get('/api/info', (request, response) => {
    response.send(`<h1>Agenda de contacto</h1><br><p>Tienes la informacion de ${persons.length} personas</p><br><p>${fechaActual()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if(person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const body = request.body
    const name = body.name
    const nameAgendado = persons.find(person => person.name === name)

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if(nameAgendado) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    response.json(person)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// Servir index.html para todas las rutas no-API
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})