// import ProductModel from '../models/Product.js'

const uuid = require('uuid')
const path = require('path')
const {Book} = require('../models/models')
const ApiError = require('../error/ApiError')

class BookController {
	async create(req, res, next) {
		try {
			let {title, year, authorId} = req.body
			const {img} = req.files
			let fileName = uuid.v4() + ".jpg"
			img.mv(path.resolve(__dirname, '..', 'static', fileName))
			const book = await Book.create({title, year, authorId, img: fileName})
			
			return res.json(book)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async getAll(req, res) {
		let {authorId, limit, page} = req.query
		page = page || 1
		limit = limit || 15
		let offset = page * limit - limit
		let books;
		if (!authorId) {
			books = await Book.findAndCountAll({limit, offset})
		}
		if (authorId) {
			books = await Book.findAndCountAll({where:{authorId}, limit, offset})
		}
		return res.json(books)
	}

	async getOne(req, res){
		const {id} = req.params
		const book = await Book.findOne(
			{
				where: {id},
			},
		)
		return res.json(book)
	}

	async delete(req, res){
		const {id} = req.params
		const book = await Book.destroy(
			{
				where: {id},
			},
		)
		return res.json(book)
	}


	async update(req, res, next) {
		try {
			const {id} = req.params
			let {title, year} = req.body
			const {img} = req.files
			let fileName = uuid.v4() + ".jpg"
			img.mv(path.resolve(__dirname, '..', 'static', fileName))
			const book = await Book.update({id, title, year, img: fileName})
			
			return res.json(book)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}
	// async update(req, res, next) {
 //        try {
 //            if (!req.params.id) {
 //                throw new Error('Не указан id книги')
 //            }
 //            if (Object.keys(req.body).length === 0) {
 //                throw new Error('Нет данных для обновления')
 //            }
 //            const book = await Book.update(req.params.id, req.body, req.files?.img)
 //            res.json(book)
 //        } catch(e) {
 //            next(AppError.badRequest(e.message))
 //        }
 //    }
}


module.exports = new BookController()