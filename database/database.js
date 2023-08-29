const Sequelize = require('sequelize')

const connection = new Sequelize('xxxxxx','root','xxxxx',{// nome do banco, usuario e senha
    host:'localhost',// servidor onde esta rodando
    dialect: 'mysql'// qual tipo de banco de dados
})

module.exports = connection
