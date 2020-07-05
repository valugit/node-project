const express = require('express'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  homeRouter = require('./routes/home'),
  paintRouter = require('./routes/paint'),
  filmsRouter = require('./routes/films'),
  tilesApiRouter = require('./routes/api/tiles'),
  filmsApiRouter = require('./routes/api/films')

const port = process.env.PORT || 3000
const hostname = process.env.HOST || 'localhost'

const app = express(),
  server = require('http').createServer(app),
  io = require('socket.io')(server)

app.set('view engine', 'pug')

app.use((req, res, next) => {
  req.io = io
  next()
})

app.use(session({
  secret: 'myS3cr3t',
  saveUninitialized: true,
  resave: true,
  cookie: {}
}))

app.use(express.static('public'))
app.use(bodyParser.json({ extended: true }))

app.use(homeRouter)
app.use(paintRouter)
app.use(filmsRouter)
app.use(tilesApiRouter)
app.use(filmsApiRouter)

app.get('/notFound', (req, res) => res.render('errors/404'))

server.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`))