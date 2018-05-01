const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/plantr', { logging: true })

const Gardener = db.define('gardener', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: Sequelize.INTEGER
})

const Plot = db.define('plot', {
  size: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  shaded: Sequelize.BOOLEAN
})

const Vegetable = db.define('vegetable', {
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  planted_on: Sequelize.DATE
})

Gardener.hasOne(Plot)
Gardener.belongsTo(Vegetable, { as: 'favorite_vegetable' })
Plot.belongsTo(Gardener)
Plot.belongsToMany(Vegetable, { through: 'vegetable_plot' })
Vegetable.belongsToMany(Plot, { through: 'vegetable_plot' })


module.exports = { db, Vegetable, Gardener, Plot }
