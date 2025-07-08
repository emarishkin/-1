import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import type { IBook } from "../type/Contact";
import { BookCard } from "../components/BookCard";

export const BookManager:FC = () => {
    
    const [selectedGenre,setSelectedGenre] = useState<string>('all')
    const [search,setSearch] = useState<string>('')
    const [filterList,setFilterList] = useState<IBook[] | null>(null)

    const [bookList,setBookList] = useState<IBook[]>([])
    const [addBook,setAddBook] = useState({
        title:'',
        author:'',
        genre:'',
        read:false
    })
    
    const getUniqueGenres = () => {
        const genres = bookList.map(item=>item.genre)
        return ['all',...new Set(genres)]
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name,value} = e.target

        if(name === 'search'){
            setSearch(value)
        } else if( name === 'genreFilter'){
            setSelectedGenre(value)
        } else {
             setAddBook({...addBook,[name]:value})
        } 
    }

    const hanleSubmit = (e:FormEvent) => {
        e.preventDefault()

        if (!addBook.title.trim() || !addBook.author.trim()) {
            alert('Заполните поля "Автор" и "Название"');
            return;
        }

        const newBook:IBook = {
            id:Date.now(),
            title:addBook.title,
            author:addBook.author,
            genre:addBook.genre,
            read:addBook.read
        }

        setBookList([...bookList,newBook])
        setAddBook({title:'',author:'',genre:'',read:false})

    }

    const onChangeClick = (id:number) => {
        setBookList(bookList.map(item => item.id === id ? {...item,read:!item.read}:item))
    }

    const deleteBook = (id:number) => {
        setBookList(bookList.filter(item=>item.id!==id))
    }

    const applyFilters  = () => {

       let filtred = [...bookList]

       if(search.trim()){
        filtred = filtred.filter(item=>item.title.toLowerCase().includes(search.toLowerCase()))
       }

       if(selectedGenre !== 'all'){
        filtred = filtred.filter(item=>item.genre.toLowerCase()===selectedGenre.toLowerCase())
       }
        setFilterList(filtred?filtred:null)

    }

    const resetFilter = () => {
        setFilterList(null)
         setSearch('');
        setSelectedGenre('all')
    }

    const presentation = filterList !== null? filterList : bookList

    return (
        <div>

            <div>
                <label>Поиск по названию:</label>
                <input 
                name="search"
                type="text" 
                value={search} 
                onChange={handleChange}
                />
                <button onClick={resetFilter}>Сбросить</button>
                <button onClick={applyFilters}>Найти</button>

                <label>Фильтр по жанру:</label>
                <select name="genreFilter" value={selectedGenre} onChange={handleChange}>
                       {getUniqueGenres().map(item=>(
                        <option key={item} value={item}>
                            {item === 'all'?'все жанры':item}
                        </option>
                       ))}
                </select>

            </div>


            <form onSubmit={hanleSubmit}>
                <h2>Добавить книгу</h2>

                <div>
                    <label>Название книги</label>
                    <input 
                    type="text" 
                    name="title" 
                    placeholder="Введите название"
                    onChange={handleChange}
                    value={addBook.title}
                    required
                    />
                </div>

                <div>
                    <label>Автор книги</label>
                    <input 
                    type="text" 
                    name="author" 
                    placeholder="Введите автора"
                    onChange={handleChange}
                    value={addBook.author}
                    required
                    />
                </div>

                <div>
                    <label>Жанр книги</label>
                    <input 
                    type="text" 
                    name="genre" 
                    placeholder="Введите жанр"
                    onChange={handleChange}
                    value={addBook.genre}
                    required
                    />
                </div>

                <button type="submit">Добавить книгу</button>

            </form>

            {presentation && (
                <div>
                    {presentation.map(book=>(
                        <div style={{border:'1px solid black',display:'flex'}} key={book.id}>
                            <BookCard book={book} onChange={()=>onChangeClick(book.id)} OnDelete={()=>deleteBook(book.id)}/>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}