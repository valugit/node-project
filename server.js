const express = require('express'),
  session = require('express-session'),
  path = require('path'),
  bodyParser = require('body-parser'),
  authorizationMiddlewares = require('./middlewares/authorization'),
  homeRouter = require('./routes/home'),
  authRouter = require('./routes/auth'),
  paintRouter = require('./routes/paint'),
  cinemaRouter = require('./routes/cinema'),
  tilesApiRouter = require('./routes/api/tiles'),
  filmsApiRouter = require('./routes/api/films'),
  distributorsApiRouter = require('./routes/api/distributors'),
  categoriesApiRouter = require('./routes/api/categories'),
  usersApiRouter = require('./routes/api/users'),
  sessionsApiRouter = require('./routes/api/sessions')

const port = process.env.PORT || 3000
const hostname = process.env.HOST || 'localhost'

const app = express(),
  server = require('http').createServer(app),
  io = require('socket.io')(server)

app.set('view engine', 'pug')

app.use(authorizationMiddlewares)

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

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json({ extended: true }))

app.use(homeRouter)
app.use(authRouter)
app.use(paintRouter)
app.use(cinemaRouter)
app.use(tilesApiRouter)
app.use(filmsApiRouter)
app.use(distributorsApiRouter)
app.use(categoriesApiRouter)
app.use(usersApiRouter)
app.use(sessionsApiRouter)

app.get('/notFound', (req, res) => res.render('errors/404'))

server.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`))