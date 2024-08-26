import { Book as BookMapping } from './models.js'
import { Author as AuthorMapping } from './models.js'
import FileService from '../services/File.js'
import AppError from '../errors/AppError.js'

class BookM {
    
    async update(id, data, img) {
        const book = await BookMapping.findByPk(id)
        if (!book) {
            throw new Error('Книга не найдена в БД')
        }
       
        const file = FileService.save(img)
        
        if (file && book.img) {
            FileService.delete(book.img)
        }
        
        const {
            title = book.title,
            year = book.year,
            authorId = book.authorId,
            img = file ? file : book.img
        } = data
        await book.update({title, year, authorId, img})
        
        await book.reload()
        return book
    }

}

export default new BookM()