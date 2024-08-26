import {makeAutoObservable} from 'mobx';

export default class BookZone {
	constructor() {
		this._books = []
		this._authors = []
		this._selectedAuthor = {}
		this._page = 1
		this._totalCount = 0
		this._limit = 8
		makeAutoObservable(this)
	}

	setBooks(books) {
		this._books = books
	}
	setAuthors(authors) {
		this._authors = authors
	}

	setSelectedAuthor(authors) {
		this.setPage(1)
		this._selectedAuthor = authors
	}

	setPage(page) {
		this._page = page
	}

	setTotalCount(count) {
		this._totalCount = count
	}

	get books() {
		return this._books
	}
	get authors() {
		return this._authors
	}
	get selectedAuthor() {
		return this._selectedAuthor
	}
	get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}