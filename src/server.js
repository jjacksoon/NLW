const express = require("express")
const server =  express()

//Pegar o banco de dados
const db = require("./database/db")

//Configurando pasta pública
server.use(express.static("public"))

//!Habilitando o uso do req.body na aplicação
server.use(express.urlencoded({extended: true}))



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

// *Pegando conteudo da url após submissao de cadastro no Banco de dados
    console.log(req.query)
    return res.render("create-point.html")
})

// !Escondendo os dados que são mencionados na url ao cadastrar ponto de coleta
server.post("/savepoint", (req, res) => {
    console.log(req.body)
    //Inserindo dados no banco de dados
    

        // *02 - Inserir dados na tabela
        
        const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?, ?, ?, ?, ?, ?, ?);
            `
        
        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ]

        function afterInsertData(err){            
            if(err){
                console.log(err) //*Mostrando o erro que apareceu
                return res.send("Erro no cadastro!")
            }
             console.log("cadastrado com sucesso!")
             console.log(this)
             
             return res.render("create-point.html", {saved: true})
        }

        db.run(query, values, afterInsertData)
})



// ?A parte de Search results é algo dinâmico.Logo, deverá ser
// ?feito de uma outra forma para que possam ser extraídos dados
// ?do banco de dados que está recebendo os cadastros dos ecopontos

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
        //Pesquisa vazia
        // *Mostra a página html com os dados do banco de dados
        return res.render("search-results.html", {total: 0})
    }
        if(search == ""){
        //Pesquisa vazia
        // *Mostra a página html com os dados do banco de dados
        return res.render("search-results.html", {total: 0})
    }

    
    //Pegar os dados do banco de dados

        // *03 - Consultar os dados da tabela

        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
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
