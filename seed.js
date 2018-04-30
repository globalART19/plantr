// const Express = require('express')
// const app = new Express()
// const morgan = require('morgan')
const { db, Vegetable, Gardener, Plot } = require('./models')

// app.use(morgan())
const veggies = ['carrot', 'tomato', 'bean', 'corn', 'squash', 'lechuga'];
const gardeners = ['gary', 'steve', 'joe'];
const plots = [7, 4, 10];

const PORT = 1337

function seed(vegArr, gardArr, plotArr) {
  for (let i = 0; i < veggies.length; i++) {
    console.log(veggies[i]);
    Vegetable.create({ name: veggies[i] })
      .then((veggie) => {
        console.log('inserted')
        return Gardener.create({ name: gardeners[i] })
      })
      .then((gardner) => {
        console.log('inserted')
        return Plot.create({ size: plots[i] })
      })
      .catch((error) => {
        console.error('no more gardeners/plots', error);
      })
  }
}

function init() {
  db.sync({ force: true, })
    .then(() => {
      console.log('good job it worked!!')
      return seed(veggies, gardeners, plots)
    })
    //.then(() => { db.close() })
    .catch((err) => {
      console.error('Oops,  you broke it!', err)
    })
}
init()
