const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000; // bardzo istotna linijka - port zostaje przydzielony przez Heroku
const path = require('path')
let hbs = require('express-handlebars');
let data = []
app.use(express.static('static'))

app.use(express.urlencoded({
        extended: true
    }));

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

app.get("/logout", function(req, res){
       app.engine('hbs', hbs({ defaultLayout: 'main.hbs'}));
    res.redirect("/")
  
});

app.post("/register", function (req, res) {
    res.send("Zarejestrowano pomyślnie")
    data.push(req.body)
    })

    app.post("/loginf", function (req, res) {
        for(let i=0 ; i < data.length;i++){
            if(req.body.login == data[i].login){
                if(req.body.password == data[i].password){
                    res.redirect("/admin")
                    app.engine('hbs', hbs({ defaultLayout: 'main2.hbs'})); 
                }else{
                    res.redirect("/login")
                }
            }
        }
        })



app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs'}));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');    

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
console.log(__dirname)
})