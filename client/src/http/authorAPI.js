import {$authHost, $host} from './index';
import jwt_decode from 'jwt-decode'

export const createAuthor = async (author) => {
	const {data} = await $host.post('api/author', author)
	return data
}

export const fetchAuthors = async (page, limit = 8) => {
	const {data} = await $host.get('api/author', {params: {
		page, limit
	}})
	return data
}

export const fetchOneAuthor = async (id) => {
	const {data} = await $host.get('api/author/' + id)
	return data
}

export const deleteAuthor = async (id) => {
	const {data} = await $host.delete('api/author/' + id)
}