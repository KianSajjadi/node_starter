const express = require('express')
const router = new express.Router()
const Article = require('./articles.model')

router.get('/', (req, res) => {
  Article.findAll().then(articles => {
      res.render(__dirname + '/views/index', { articles })
  })
})

router.get('/new', (req, res) => {
  res.render(__dirname + '/views/new')
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Article.findById(id).then(article => {
    res.render(__dirname + '/views/show', { article: article })
  })
  .catch(error => {
    console.error("Error at GET /articles/:id", error)
  })
})


router.post('/new', (req, res) => {
  let params = req.body
  Article.create({
    title: params.title,
    content: params.content
  })
  .then(success => {
    res.render(__dirname + '/views/new', { success: true })
  })
})

router.post('/:id/edit', (req, res) => {
  const id = req.params.id
  const params = req.body
  Article.findById(id).then(article => {
    article.update({
      title: params.title,
      content: params.content
    })
    .then(() => {
        res.redirect('/articles/')
    })
  })
})
router.post('/:id/delete', (req, res) => {
 const id = req.params.id
 const params = req.body
 Article.findById(id).then(article => {
  Article.destroy()
 })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Article.findById(id).then(article => {
      res.render(__dirname + '/views/edit', { article })
  })
})
router.get('/:id/delete', (req, res) => {
  const id = req.params.id
  Article.findById(id).then(article => {
    res.render(__dirname + '/views/delete', {article})
  })
})

module.exports = router