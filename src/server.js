const express = require("express")
const server =  express()

//Pegar o banco de dados
const db = require("./database/db")

//Configurando pasta pública
server.use(express.static("public"))



// Utilizando template engine
const nunjucks = require("nunjucks")

nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})




//Configurar caminhos da minha aplicação
//Página inicial
//  rec - requisição (pedido)
//  res - resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})

//Rota para página de formulário
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

// ?A parte de Search results é algo dinâmico.Logo, deverá ser
// ?feito de uma outra forma para que possam ser extraídos dados
// ?do banco de dados que está recebendo os cadastros dos ecopontos

server.get("/search", (req, res) => {

    //Pegar os dados do banco de dados

        // *03 - Consultar os dados da tabela

        db.all(`SELECT * FROM places`, function(err, rows){
            if(err){
                return console.log(err) //*Mostrando o erro que apareceu
            }
            console.log("Aqui estão seus registros")
            console.log(rows)
            const total = rows.length

            // *Mostra a página html com os dados do banco de dados
            return res.render("search-results.html", {places: rows, total: total})
        })
})


// !Ligar o servidor
server.listen(3000)
