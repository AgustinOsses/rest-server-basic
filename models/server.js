const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../db/config')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users'

        //Connection DB
        this.connectionDb()

        //Middlewares
        this.app.use(cors())
        this.app.use(express.json())
        this.middlewares();

        this.routes();
    }

    async connectionDb(){
        await dbConnection();

    }

    middlewares(){
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usersPath, require('../routes/users'))
    }

    listen(){
        this.app.listen(this.port)
        console.log('Servidor corriendo en el puerto', this.port );
    }


}

module.exports = Server