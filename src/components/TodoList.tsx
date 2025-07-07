import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import type { ITodo } from "../type/Todo";
import { TodoItem } from "./TodoItem";

interface TodoListProps{}

export const TodoList:FC<TodoListProps> = () => {

    const [list,setList] = useState<ITodo[]>([])
    const [title,setTitle] = useState<string>('')
    const [completed, setCompleted] = useState<boolean>(false);
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
     
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()

        const newTodo:ITodo = {
            id: Date.now(),
            title,
            completed
        }
        setList([...list,newTodo])
        setTitle('')
    }

    const handeleDelete = (id:number) => {
        setList(list.filter(item=>item.id!==id))
    }

    const handeleToggle = (id:number) => {
        setList(list.map(item=>item.id===id?{...item,completed:!item.completed}:item))
    }

    const filteredList = list.filter((item) => {
      if (filter === "active") return !item.completed;
      if (filter === "completed") return item.completed;
      return true
    });

    return (
        <div>
        <form onSubmit={handleSubmit}>
           <h2>Добавление задачи</h2>
           <div>
                <label>Задача</label>
                <input 
                type="text" 
                value={title}
                placeholder="Ваша задача"
                onChange={(e)=>setTitle(e.target.value)}
                required
                />
           </div>
           <div>
                <label>Статус</label>
                <select name="completed" value={completed.toString()} onChange={(e:ChangeEvent<HTMLSelectElement>)=>setCompleted(e.target.value === 'true')}>
                     <option value="false">Не выполнено</option>
                     <option value="true">Выполнено</option>
                </select>
           </div>
           <button type="submit">Добавить+</button>
        </form>

        <div>
           <h2>Список задач</h2>
           {filteredList.length===0?('Задач нет')
           :(
             filteredList.map(el=>(
                <div key={el.id}>
                    <TodoItem todo={el} OnDelete={()=>handeleDelete(el.id)} onToggle={()=>handeleToggle(el.id)} />
                </div>
             ))
           )}    
        </div>
        
        <div>
        <button onClick={() => setFilter("all")}>Все</button>
        <button onClick={() => setFilter("active")}>Активные</button>
        <button onClick={() => setFilter("completed")}>Выполненные</button>
        </div>

        </div>
    )
}