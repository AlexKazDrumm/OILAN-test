import {$authHost, $host} from './index';
import jwt_decode from 'jwt-decode'

export const createBook = async (book) => {
	console.log(book)
	const {data} = await $host.post('api/book', book)
	return data
}

export const fetchBooks = async (authorId, page, limit = 8) => {
	const {data} = await $host.get('api/book', {params: {
		authorId, page, limit
	}})
	return data
}

export const fetchOneBook = async (id) => {
	const {data} = await $host.get('api/book/' + id)
	return data
}

export const deleteBook = async (id) => {
	const {data} = await $host.delete('api/book/' + id)
}

export const updateBook = async (id, book) => {
	console.log(book)
	const {data} = await $host.put(`api/book/${id}`, book)
}
