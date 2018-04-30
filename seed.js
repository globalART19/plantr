const { db, Vegetable, Gardener, Plot } = require('./models')

const veggies = ['carrot', 'tomato', 'bean', 'corn', 'squash', 'lechuga'];
const gardeners = ['gary', 'steve', 'joe'];
const plots = [7, 4, 10];

const PORT = 1337

function seed() {
  let i = 0
  return Promise.all(veggies.map((veg) => {
    console.log(veg);
    Vegetable.create({ name: veg })
      .then((veggie) => {
        return Gardener.create({ name: gardeners[i], favoriteVegetableId: veggie.id })
      })
      .then((gardener) => {
        console.log('inserted gardener')
        return Plot.create({ size: plots[i], gardenerId: gardener.id })
      })
      .then(() => { console.log('plot inserted') })
      .catch((error) => {
        console.error('no more gardeners/plots');
        return null
      })
    i++
  }))
}

function seed2(vegArr) {
  let i = 0
  return Promise.all(vegArr.map((veg) => {
    console.log(veg);
    Vegetable.create({ name: veg })
      .then((veggie) => {
        return Gardener.create({ name: gardeners[i], favoriteVegetableId: veggie.id })
      })
      .then((gardener) => {
        console.log('inserted gardener')
        return Plot.create({ size: plots[i], gardenerId: gardener.id })
      })
      .then(() => { console.log('plot inserted') })
      .catch((error) => {
        console.error('no more gardeners/plots');
        return null
      })
    i++
  }))
}

function init() {
  db.sync({ force: true, })
    .then(() => {
      console.log('good job it worked!!')
      let i = 0
      return seed()
    })
    // .then(() => { db.close() })
    .catch((err) => {
      console.error('Oops,  you broke it!', err)
    })
}
init()
