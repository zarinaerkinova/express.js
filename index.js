const express = require('express')
const app = express()
const path = require('path')
const { create } = require('express-handlebars')

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: './views/layouts'
})

const users = [
    { name: 'Tom', age: 50, id: 5 },
    { name: 'Harry', age: 90, id: 6 },
    { name: 'Nyuton', age: 10, id: 7 }
]

app.use(express.static(path.join('views')))
app.use(express.urlencoded({extended: true}))

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        isHome: true
    })
})

app.post('/add/user', (req, res) => {
    req.body.id = Math.random()
    users.push(req.body)
    res.redirect('/users')
})

app.get('/users', (req, res) => {
    res.render('users', {
        title: 'Users',
        users,
        isUsers: true
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        isAbout: true
    })
})

app.listen(3000, () => {
    console.log('Server is running with port 3000');
})