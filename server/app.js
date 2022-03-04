
const express = require('express')
const models = require('./models')
const cors = require('cors')
const app = express() 

app.use(express.json())
app.use(cors())

app.delete('/books/:bookId', (req, res) => {

    const bookId = parseInt(req.params.bookId) 

    models.Book.destroy({
        where: {
            id: bookId 
        }
    }).then(_ => {
        res.json({success: true, message: 'Book has been deleted!'})
    })
})

app.post('/books', (req, res) => {

    const name = req.body.name
    const isbn = req.body.isbn 
    const isPublished = req.body.isPublished 
    const genre = req.body.genre 

    const book = models.Book.build({
        name: name, 
        isbn: isbn, 
        is_published: isPublished, 
        genre: genre 
    })

    book.save().then(_ => {
        res.json({success: true})
    }).catch(error => res.json({ success: false, message: error }))

})

app.get('/books', (req, res) => {
    models.Book.findAll({}).then(books => res.json(books))
})


app.listen(8080, () => {
    console.log('Server is running...')
})