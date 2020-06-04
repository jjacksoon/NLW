const express = require("express")
const server =  express()

//Configurar caminhos da minha aplicação
//Página inicial
server.get("/", (req, res) => {

//  rec - requisição (pedido)
//  res - resposta
    res.send("Cheguei aqui")
})



// !Ligar o servidor
server.listen(3000)
