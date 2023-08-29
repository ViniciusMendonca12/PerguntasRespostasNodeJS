const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas','root','familia100',{// nome do banco, usuario e senha
    host:'localhost',// servidor onde esta rodando
    dialect: 'mysql'// qual tipo de banco de dados
})

module.exports = connection