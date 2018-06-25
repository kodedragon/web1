const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set ('view engine','hbs');

// middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: method: ${req.method} url:${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if (err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {

//     res.render('maintenance.hbs');
// });

// all my directories to use
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=> {
    return  new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=> {
    return  text.toUpperCase();
});

app.get ('/', (req, res) => {
    //res.send ("<h1>Hello Expess!!!<h1>");
    res.render( 'home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "Salamaliekum and Welcome to my page!"
    });

});

app.get ('/about', (req, res) => {
    //res.send ("<h1>Hello Expess!!!<h1>");
    res.render( 'about.hbs', {
        pageTitle: 'About Page',
    });
});


app.listen(3000, () => {
    console.log("Server is now running ... ")
});