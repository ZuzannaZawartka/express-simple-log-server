const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000; // bardzo istotna linijka - port zostaje przydzielony przez Heroku
const path = require('path')
let hbs = require('express-handlebars');
app.use(express.static('static'))

app.get("/", function(req, res){
       res.render('mainPage.hbs');
});

app.get("/register", function(req, res){
           res.render('register.hbs');
});
app.get("/login", function(req, res){
       res.render('login.hbs');
});

app.get("/admin", function(req, res){
       res.render('admin.hbs');
});

app.post("/register", function (req, res) {
        console.log(req.body)
        res.setHeader("content-type", "text/plain")
        res.send(req.body)
    
    })

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs'}));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');    

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
console.log(__dirname)
})