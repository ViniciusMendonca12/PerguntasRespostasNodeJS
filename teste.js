const express = require("express");
const app = express();

app.set('view engine','ejs');// pedindo pro express usando o ejs como view engine
app.use(express.static('public'));

app.get("/", (req, res) => {
    var nome = "Victor Lima"
    var lang = "JavaScript"
    var exibirMsg = false
    var produtos = [
        {nome: "Doritos", preco: 3.14},
        {nome: "Coca-cola", preco: 5},
        {nome: "Leite", preco: 1.45}


    ]

    

    res.render("index.ejs",{ //render olha automaticamente a pasta views, isto é padrão do express.
        nome: nome, 
        lang: lang,
         empresa: "Guia do Programador",
         msg: exibirMsg,
         produtos: produtos
        }) // é necessario importar as variaveis por assim dizer.
});


app.get("/home", (req, res) => {
    res.render("home.ejs")
})

app.listen(8080, () => {
    console.log("App rodando!");
});

