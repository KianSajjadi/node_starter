//libraries
const pug = require('pug')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('mydb.db')
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS `articles` (`id`  INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,`title` TEXT, `content` TEXT)")
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('views', './templates');
app.set('view engine', 'pug');

app.get('/', (req,res) =>{
  res.send('Go to /articles doofy')
})

app.get('/articles', (req, res)=> {
  const statement = `SELECT * from articles`
  db.all(statement, (err, data) => {
    console.log(data)
    res.render('articles/index', { articles: data })
  })
})

app.get('/articles/new', (req, res) => {
  res.render('articles/new')
})

app.get('/articles/:id/edit', (req, res) => {
  const articleId = req.params.id
  const statement= `SELECT * FROM articles WHERE id=${articleId};`
    db.get(statement, (err, article)=> {
      if(err) {console.log(err); return;}
      console.log("editing article","id", article.id,"title:", article.title)
      res.render('articles/edit', { article: article })
    })
})



app.get('/articles/:id', (req, res) => {
  const articleId = req.params.id
  const statement = `SELECT * FROM articles WHERE id=${articleId};`
  db.get(statement, (err, article)=> {
    if (err) { console.log(err); return; }
    console.log("got article", article)
    res.render('articles/show', { article: article })
  })
})

app.post('articles/:id/edit', (req, res)=> {
  let params = req.body
  const statement = `REPLACE INTO articles("title", "content") VALUES ("${params.title}", "${params.content}")`
  console.log(statement)
  db.run(statement, (err)=> {
    if(err) {console.log('Error with Editing', err); return;}
    res.render("articles/new", {success: true})
  })
})
app.post('/articles/new', (req, res) => {
  let params = req.body
  const statement = `INSERT INTO articles("title", "content") VALUES ("${params.title}", "${params.content}")`
  console.log(statement)
  db.run(statement, (err) => {
    if (err) { console.log('Error with the DB DOGE', err); return; }
    res.render('articles/new', { success: true })
  })  
})


app.listen(3000, function() {
  console.log('Listening on http://localhost:3000')
})


