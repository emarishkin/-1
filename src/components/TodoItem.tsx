import type { FC } from "react";
import type { ITodo } from "../type/Todo";

interface TodoItemProps{
    todo:ITodo
    OnDelete:()=>void
    onToggle:()=>void
}

export const TodoItem:FC <TodoItemProps> = ({todo,OnDelete,onToggle}) => {
    return (
        <div >
            <h2>{todo.title}</h2>
            <p onClick={onToggle}>{todo.completed? "✓ Выполнено" : "✗ Не выполнено"}</p>
            <button onClick={OnDelete}>Удалить задачу</button>
        </div>
    )
}