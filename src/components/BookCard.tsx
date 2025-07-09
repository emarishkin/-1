import type { FC } from "react";
import type { IBook } from "../type/Book";
import "../styles/BookCard.css";

interface BookCardProps {
    book: IBook
    onDelete: () => void
    onToggle: () => void
}

export const BookCard: FC<BookCardProps> = ({ book, onDelete, onToggle }) => {
    return (
        <div className="book-card">
           <h2>{book.title}</h2>
           <h2>{book.author}</h2>
           <h2>{book.genre}</h2>
           <button onClick={onToggle}>{book.read ? 'Книга прочитана' : 'Книга не прочитана'}</button>
           <button onClick={onDelete}>Удалить книгу</button>
        </div>
    )
}