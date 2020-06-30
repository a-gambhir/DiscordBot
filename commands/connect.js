module.exports = {

    name:'connect',
    description:'Make a connection to a given MySQL server',

    execute(message, args){

        var mysql      = require('mysql');
        var con = mysql.createConnection({
            host     : 'localhost',
            database : 'dbname',
            user     : 'username',
            password : 'password',
        });
          


    }


}