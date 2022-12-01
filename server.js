// Dependencies

const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const pokemon = require('./models/pokemon.js');
const { response } = require('express');

// Object
const app = express();

// Middleware

app.use(morgan("dev"));
app.use(methodOverride("method"));
app.use(express.urlencoded({extended: true}));
app.listen("/static", express.static("public"));

// Routes and Router

app.get("/", (require, response) => {
    response.render('landing.ejs')
});

// Index

app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { 
        pokemon: pokemon,
    });
});

// New Routes
app.get("/pokemon/new", (req, res) => {
    res.render('new.ejs', {
        pokemon: pokemon,
    });        
});

// Delete or Destroy
app.delete("/pokemon/:id", (req, res) => {
    pokemon.splice(req.params.id, 1);
    res.redirect("/pokemon");
});  

// Update Router
app.put('/pokemon/:id', (req, res) => {
    pokemon[req.params.id] = req.body;
    res.redirect("/pokemon");
    console.log(req.body);
});

// edit
app.get("/pokemon/:id/edit", (req, res) => {
    res.render("edit.ejs", {
        pokemon: pokemon[req.params.id],
        index: req.params.id
    });
});

// Show Route
app.get("/pokemon/:id", (req, res) => {
    res.render('show.ejs', { 
        pokemon: pokemon[req.params.id], 
        index: req.params.id,
    });
});


// create route
app.post("/pokemon", (req, res) => {
    pokemon.unshift(req.body);
    res.redirect("/pokemon");
});   

// Server Listener

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});