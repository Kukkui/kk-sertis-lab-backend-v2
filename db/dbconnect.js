var mysql = require('mysql');
var con = mysql.createConnection({
    host: "db4free.net", //or localhost
    user: "kukkui", //mysql username
    password: "Kukkui2537", //mysql password
    database: "kukkui" //db
  });
con.connect(function(err) {
    if (err) throw err;
});

module.exports = {
    con: con
}