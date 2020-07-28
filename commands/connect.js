module.exports = {

    commands:['connect',],
    expectedArgs:'<hostname> <databaseName> <username> <password>',
    minArgs: 4,
    maxArgs: 4,
    requiredRoles: ['Admin'],
    //description:'Make a connection to a given MySQL server',

    callback: (message, args) => {

        var mysql = require('mysql');

        let host = args[0];
        let database = args[1];
        let user = args[2];
        let password = args[3];

        var con = mysql.createConnection({
            host     : host,
            database : database,
            user     : user,
            password : password,
        });
          
        con.connect(error => {
            if(error){
                message.reply("Could not connect to database. Format: .connect <host> <database> <username> <password>");  
                throw error;
            }
            message.reply("Connected to database.");
        })





    }


}