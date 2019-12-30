const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


// new Express application
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
// generate path to the public folder - css/img/js folders can be referenced with absolute path relative to this directory
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Kevin"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Kevin"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "helpppppp",
        title: 'Help',
        name: 'Kevin'
    })
})

// can send objects (JSON) or arrays []

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Need to provide a weather address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            // return will terminate rest of code
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            // sends to browser
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Kevin'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found.',
        name: 'Kevin'
    })
})



// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server started on ' + port)
})