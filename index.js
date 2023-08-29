const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database.js")
const Pergunta = require("./database/pergunta.js")
const Resposta = require("./database/Resposta.js")
//connection

connection.authenticate()
    .then(() => {
    console.log("Conexão feita com o banco de dados!")
})
    .catch((msgErro) => {
        console.log(msgErro)
    })

app.set('view engine','ejs');// pedindo pro express usando o ejs como view engine
app.use(express.static('public')); //para renderizar arquivos estaticos

app.use(bodyParser.urlencoded({extended: false}))//carregando body parser
app.use(bodyParser.json())

app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true, order:[['id','DESC']]}).then(perguntas => {
        res.render("index.ejs",{
            perguntas: perguntas
        })
    })
})


app.get("/home", (req, res) => {
    res.render("home.ejs")
})

app.get("/perguntas", (req, res) =>{
    res.render("perguntar.ejs")
})

app.post("/salvarPergunta", (req, res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    })
})


app.get("/perguntas/:id", (req, res) =>{
    var id = req.params.id;
    Pergunta.findOne({ 
        where: {id :id}
    }).then(pergunta => { //quando a operação de busca for concluida ele ira chamar esse then.
        if(pergunta != undefined){ //pergunta encontrada
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
        
            }).then(respostas =>{
                res.render("pergunta.ejs", {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })

          
        }else{
            res.redirect("/")
        }
    })
})

app.get("/excluir/:id", (req, res) => {
    const idExcluir = req.params.id
     Pergunta.destroy({
        where:{
            id: idExcluir
        }
    }).then(pergunta =>{
        if(pergunta != undefined){
            res.render("excluir.ejs",{
                pergunta: pergunta
               
            })
        }else{
            res.redirect("/")
        }
    })
    

})

/* app.post("excluirPergunta", (req, res) =>{

}) */

app.post("/responder", (req, res) =>{ // essa rota é criada apenas para salvar os dados.
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/perguntas/"+ perguntaId)
    })
})

app.get("/editar/:id", (req, res) => {
    idEditar = req.params.id
    Pergunta.findOne({
        where:{id: idEditar} 
    }).then(pergunta =>{
        res.render("editar.ejs", {pergunta: pergunta} )
    })
})

app.post("/editarPergunta", (req, res) =>{
    var titulo = req.body.titulo
    var descricao = req.body.descricao 
    var idPergunta = req.body.pergunta
    Pergunta.update({
        titulo: titulo,
        descricao: descricao
    }, {where: {
        id: idPergunta
        }
    })
    res.redirect("/")



})


app.listen(8080, () => {
    console.log("App rodando!");
});

