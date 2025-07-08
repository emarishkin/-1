import type { FC } from "react";
import type { IBook } from "../type/Contact";

interface BookCardProps{
    book:IBook
    onChange:()=>void
    OnDelete:()=>void
}

export const BookCard:FC<BookCardProps> = ({book,onChange,OnDelete}) => {
    return (
        <div>
            <div>
                <h3>{book.title}</h3>
                <h3>{book.author}</h3>
            </div>
            <p>{book.genre}</p>
            <button onClick={onChange}>{book.read ? 'Книга прочитана':'Книга не прочитана'}</button>
            <button onClick={OnDelete}>Удалить</button>
        </div>
    )
}