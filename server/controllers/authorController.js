const uuid = require('uuid')
const path = require('path')
const {Author} = require('../models/models')
const ApiError = require('../error/ApiError')

class AuthorController {
	async create(req, res, next) {
		try {
			let {name, surname, year} = req.body
			const author = await Author.create({name, surname, year})
			
			return res.json(author)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async getAll(req, res) {
		let {limit, page} = req.query
		page = page || 1
		limit = limit || 15
		let offset = page * limit - limit
		let authors;
		authors = await Author.findAndCountAll({limit, offset})
		return res.json(authors)
	}

	async getOne(req, res){
		const {id} = req.params
		const author = await Author.findOne(
			{
				where: {id},
			},
		)
		return res.json(author)
	}

	async delete(req, res){
		const {id} = req.params
		const author = await Author.destroy(
			{
				where: {id},
			},
		)
		return res.json(author)
	}
}

module.exports = new AuthorController()