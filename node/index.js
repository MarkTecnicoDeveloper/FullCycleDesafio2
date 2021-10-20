const express = require('express')
const faker = require('faker')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

/*const sql = `INSERT INTO people(name) values('Marcos - Teste2')`
connection.query(sql)
connection.end()*/

app.get('/', (req,res) =>{
    const name = faker.name.findName()

    connection.query(`INSERT INTO people (name) VALUES ('${name}')`)

    connection.query(`SELECT name FROM people`, (error, results, fields) => {
        res.send(`
        <h1>Full Cycle Rocks!</h1>
        <ol>
            ${!!results.length ? results.map(el => `<li>${el.name}</li>`).join('') : ''}
        </ol>
        `)
    })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})