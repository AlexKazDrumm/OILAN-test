const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Book = sequelize.define('book', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	title: {type: DataTypes.STRING, unique: true},
	year: {type: DataTypes.INTEGER, defaultValue: 0},
	img: {type: DataTypes.STRING, allowNull:false},
})


const Author = sequelize.define('author', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING, allowNull: false},
	surname: {type: DataTypes.STRING, allowNull: false},
	year: {type: DataTypes.INTEGER, defaultValue: 0},
})

Author.hasMany(Book)
Book.belongsTo(Author)



module.exports = {
	Book,
	Author
}