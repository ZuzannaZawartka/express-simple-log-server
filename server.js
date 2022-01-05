const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000; // bardzo istotna linijka - port zostaje przydzielony przez Heroku
const path = require('path')
let hbs = require('express-handlebars');
let data = []
let islogged = false
app.use(express.static('static'))


app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs'}));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');    

app.use(express.urlencoded({
        extended: true
    }));

app.get("/", function(req, res){
    res.render('mainPage.hbs')

});

app.get("/register", function(req, res){
         
    res.render('register.hbs')
         
});
app.get("/login", function(req, res){
     
    res.render('login.hbs')
    
});

app.get("/admin", function(req, res){
    if(!islogged){
        app.engine('hbs', hbs({ defaultLayout: 'main.hbs'}));
        res.render('admin.hbs');
    }else{
        app.engine('hbs', hbs({ defaultLayout: 'main2.hbs'}));
        res.render('adminlogged.hbs');
    }
  
});

app.get("/show", function(req, res){
    data.sort(function(a,b){
        return parseFloat(a.id) - parseFloat(b.id)
   });
    if(!islogged){
        res.render('admin.hbs')
    }else{
      //  app.engine('hbs', hbs({ defaultLayout: 'main3.hbs'}));
        res.render('show.hbs',{data,layout:'main3.hbs'});
    }
 
});

app.get("/gender", function(req, res){

    if(!islogged){
        res.render('admin.hbs')
    }else{
        let kobiety = []
        let mezczyzni = []
        for(let i=0 ; i < data.length;i++){
            if((data[i].gender == 'female')){
                kobiety.push(data[i])
            }else{
                mezczyzni.push(data[i])
            }
        }

        res.render('gender.hbs',{kobiety,mezczyzni,layout:'main3.hbs'});
    }
  
});

app.get("/sort", function(req, res){
    if(!islogged){
        res.render('admin.hbs',{layout:'main1.hbs'})
    }else{
        let dataSorted = data
        dataSorted.sort(function(a,b){
             return parseFloat(a.age) - parseFloat(b.age)
        });
      // app.engine('hbs', hbs({ defaultLayout: 'main3.hbs'}));
        res.render('sort.hbs', {dataSorted,layout:'main3.hbs'})
    }
  

  
});


app.get("/logout", function(req, res){
    app.engine('hbs', hbs({ defaultLayout: 'main.hbs'}));
    res.redirect("/")
    islogged = false
  
});

app.post("/register", function (req, res) { //formularz rejestracji
    
        isCorrect = true
        for(let i=0 ; i < data.length;i++){
            if((req.body.login == data[i].login )){
                isCorrect = false

            }
        }
    
        if(isCorrect){
            res.send("Zarejestrowano pomyślnie")
            req.body["id"] = data.length
            data.push(req.body)
            console.log(req.body)
        }else{
            
              res.render('register.hbs'),{alert:"Taki login już istnieje !"};
        }

  
    })

    app.post("/loginf", function (req, res) { //formularz logowania
            let notExistUser = true
            for(let i=0 ; i < data.length;i++){
                if((req.body.login == data[i].login) && (req.body.password == data[i].password)){
                    islogged = true
                    notExistUser= false
                    app.engine('hbs', hbs({ defaultLayout: 'main2.hbs'})); 
                    return res.redirect("/admin")        
                }
            }
            if(notExistUser){
                return res.redirect("/login")
            }
        })

    app.post("/sort", function (req, res) { //sortowanie danych po zmianie radio
        let dataSorted = data 
        if(req.body.sort == "on"){
            dataSorted.sort(function(a,b){
                return parseFloat(b.age) - parseFloat(a.age)
                
            });
         }else{
            dataSorted.sort(function(a,b){
                return parseFloat(a.age) - parseFloat(b.age)
           });
         }
         //app.engine('hbs', hbs({ defaultLayout: 'main3.hbs'}));
         res.render('sort.hbs', {dataSorted,layout:'main3.hbs'})
    })



app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
console.log(__dirname)
})