// ?Configurando o Banco de dados

// !01 - Importar a dependência do Sqlite3
    const sqlite3 = require("sqlite3").verbose();

//! Criar o objeto que irá fazer operações no banco de dados
    const db = new sqlite3.Database("./src/database/database.db")

//! Exportando minha aplicação
    module.exports = db
    

// !Utilizar o objeto de banco de dados para nossas operações
    db.serialize(() => {
        // *Com comandos SQL, eu vou:

        // *01 - Criar uma tabela

    //     db.run(`
    //         CREATE TABLE IF NOT EXISTS places (
    //             id INTEGER PRIMARY KEY AUTOINCREMENT,
    //             image TEXT,
    //             name TEXT,
    //             address TEXT,
    //             address2 TEXT,
    //             state TEXT,
    //             city TEXT,
    //             items TEXT
    //         );
    //     `)
                // !Places é o nome da minha tabela

        // *02 - Inserir dados na tabela
        
    //     const query = `
    //         INSERT INTO places (
    //             image,
    //             name,
    //             address,
    //             address2,
    //             state,
    //             city,
    //             items
    //         ) VALUES (?, ?, ?, ?, ?, ?, ?);
    //         `
        
    //     const values = [
    //         "https://images.unsplash.com/photo-1589860518314-34bcd4d6bdff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    //         "Papersider",
    //         "Guilherme Gemballa, Jardim América",
    //         "Nº 260",
    //         "Santa Catarina",
    //         "Rio do Sul",
    //         "Papéis e Papelão"
    //     ]

    //     function afterInsertData(err){            
    //         if(err){
    //             return console.log(err) //*Mostrando o erro que apareceu
    //         }
    //          console.log("cadastrado com sucesso!")
    //          console.log(this)
    //     }

    //     db.run(query, values, afterInsertData)

        // *03 - Consultar os dados da tabela

        // db.all(`SELECT * FROM places`, function(err, rows){
        //     if(err){
        //         return console.log(err) //*Mostrando o erro que apareceu
        //     }

        //     console.log("Aqui estão seus registros")
        //     console.log(rows)
        // })

        // *04 - Deletar um dado da tabela

        // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err,){
        //     if(err){
        //         return console.log(err) //*Mostrando o erro que apareceu
        //     }
            
        //     console.log("Resgistro deletado com sucesso!")
        // })


    })

