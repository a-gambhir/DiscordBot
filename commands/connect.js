module.exports = {

    name:'connect',
    description:'Make a connection to a given MySQL server',

    execute(message, args){

        var mysql = require('mysql');
        var con = mysql.createConnection({
            host     : '192.168.1.23',
            database : 'testDB',
            user     : 'root',
            password : 'root',
        });
          
        con.connect(error => {
            if(error){
                throw error;
            }
            message.reply("Connected to database.");
        })





    }


}