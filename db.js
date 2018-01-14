var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('mydb.db')
var check;
db.serialize(function() {
  db.run("CREATE TABLE if not exists articles (info TEXT)");
  var stmt = db.prepare('INSERT INTO articles VALUES (?))');
  for(var i = 0; i < 1; i++){
    stmt.run("article + i");
  }
stmt.finalize();
db.each("SELECT rowid AS id, info FROM articles", function(err, row) {
  console.log(row.id + ":" + row.info);
})
})

db.close();
