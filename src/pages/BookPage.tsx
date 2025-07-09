import { useEffect, useState, type ChangeEvent, type FC, type FormEvent } from "react";
import type { IBook } from "../type/Book";
import { BookCard } from "../components/BookCard";
import "../styles/BookPage.css";

export const BookPage: FC = () => {
    const [selectedGenre, setSelectedGenre] = useState<string>('all');
    const [search, setSearch] = useState<string>('');
    const [searchList, setSearchList] = useState<IBook[] | null>(null);

    const [bookList, setBookList] = useState<IBook[]>(() => {
        const saveBooks = localStorage.getItem('books');
        return saveBooks ? JSON.parse(saveBooks) : [];
    });

    const [addBook, setAddBook] = useState({
        title: '',
        author: '',
        genre: '',
        read: false
    });

    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(bookList));
    }, [bookList]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'search') {
            setSearch(value);
        } else if (name === 'genreFilter') {
            setSelectedGenre(value);
        } else {
            setAddBook({ ...addBook, [name]: name === 'read' ? value === 'true' : value });
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        const newBook: IBook = {
            id: Date.now(),
            title: addBook.title,
            author: addBook.author,
            genre: addBook.genre,
            read: addBook.read
        };

        setBookList([...bookList, newBook]);
        setAddBook({ title: '', author: '', genre: '', read: false });
    };
    
    const deleteBook = (id: number) => {
        setBookList(bookList.filter(book => book.id !== id));
    };

    const toggleBook = (id: number) => {
        setBookList(bookList.map(book => book.id === id ? { ...book, read: !book.read } : book));
    };

    const genres = ['all', ...new Set(bookList.map(book => book.genre))];

    const applayFilter = () => {
        let filtred = bookList;

        // Поиск по названию
        if (search) {
            filtred = filtred.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));
        }
       
        // Фильтрация по жанрам
        if (selectedGenre !== 'all') {
            filtred = filtred.filter(book => book.genre === selectedGenre);
        }

        setSearchList(filtred);
    };

    const resetFilter = () => {
        setSearchList(null);
        setSelectedGenre('all');
        setSearch('');
    };

    const presentation = searchList ?? bookList;
     
    return (
        <div className="book-page">
            <div className="search-filters">
                <div className="search-group">
                    <label>Поиск по названию книги</label>
                    <input
                        className="search-input"
                        type="text" 
                        name="search"
                        value={search}
                        onChange={handleChange}
                        required
                    />
                    <button className="action-button" onClick={applayFilter}>Найти</button>
                    <button className="action-button reset-button" onClick={resetFilter}>Сбросить</button>
                </div>

                <div className="search-group">
                    <label>Фильтр по жанрам:</label>
                    <select 
                        className="filter-select" 
                        name="genreFilter" 
                        onChange={handleChange} 
                        value={selectedGenre}
                    >
                        {genres.map(genre => (
                            <option key={genre} value={genre}>
                                {genre === 'all' ? 'все жанры' : genre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <form className="add-book-form" onSubmit={handleSubmit}>
                <h2>Форма добавления книги</h2>
                <div className="form-group">
                    <label>Название книги:</label>
                    <input 
                        className="form-input"
                        type="text" 
                        name="title"
                        value={addBook.title}
                        onChange={handleChange}
                        placeholder="Введите название вашей книги"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Автор книги:</label>
                    <input 
                        className="form-input"
                        type="text" 
                        name="author"
                        value={addBook.author}
                        onChange={handleChange}
                        placeholder="Введите автора"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Жанр книги:</label>
                    <input 
                        className="form-input"
                        type="text" 
                        name="genre"
                        value={addBook.genre}
                        onChange={handleChange}
                        placeholder="Введите жанр"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Статус:</label>
                    <select 
                        className="form-input"
                        name="read"  
                        onChange={handleChange}
                    >
                        <option value='false'>не прочитана</option>
                        <option value='true'>прочитана</option>
                    </select>
                </div>

                <button className="submit-button" type="submit">Добавить книгу</button>
            </form>

            <div className="books-list">
                {presentation.length === 0 ? (
                    <p className="empty-list">Список пуст</p>
                ) : (
                    presentation.map(book => (
                        <BookCard 
                            key={book.id} 
                            book={book} 
                            onDelete={() => deleteBook(book.id)} 
                            onToggle={() => toggleBook(book.id)} 
                        />
                    ))
                )}
            </div>
        </div>
    );
};