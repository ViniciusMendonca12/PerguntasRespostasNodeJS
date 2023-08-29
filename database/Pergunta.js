const Sequelize = require("sequelize")
const connection = require("./database.js")

const Pergunta = connection.define('pergunta',{ //nome da tabela
    titulo:{
        type: Sequelize.STRING,
        allowNull:false
    },
    descricao:{
            type: Sequelize.TEXT,
            allowNull: false
        
    }
})

Pergunta.sync({force: false}).then(() => {}) // cria a tabela, dps so importar no index

module.exports = Pergunta