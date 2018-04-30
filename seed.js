// const Express = require('express')
// const app = new Express()
// const morgan = require('morgan')
const { db } = require('./models')

// app.use(morgan())

const PORT = 1337

function init() {
  db.sync({ force: true, })
    .then(() => {
      console.log('good job it worked!!')
      db.close()
    })
    .catch((err) => {
      console.error('Oops,  you broke it!', err)
    })
}
init()
