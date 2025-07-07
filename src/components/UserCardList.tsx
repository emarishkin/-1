import { useState, type FC, type FormEvent } from "react";
import { UserCard } from "./UserCard";

interface UserCardListProps{}

type User = {
  id: number;
  name: string;
  age: number;
  email: string;
};

const users: User[] = [
  { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
  { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
  { id: 3, name: "Charlie", age: 28, email: "charlie@example.com" },
];


export const UserCardList:FC<UserCardListProps> = () => {

    const [list,setList] = useState<User[]>(users)
    const [name,setName] = useState<string>('')
    const [age,setAge] = useState<number>(0)
    const [email,setEmail] = useState<string>('')
    const [search,setSearch] = useState<string>('')
    const [filteredList, setFilteredList] = useState<User[] | null>(null);

    const handleClick = (id:number) => {
    setList(list.filter(el=>el.id!==id))
    }  

    const searchNAME = () => {
        const filterw =  list.filter(el=>el.name.toLowerCase().includes(search.toLowerCase()))
        setFilteredList(filterw)
        setSearch('')
    }
    
    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
       
        const newId = list.length>0? Math.max(...list.map(el=>el.id))+1:1

        const newUser:User = {
            id:newId,
            name,
            age,
            email
        }

        setList([...list,newUser])

        setName('')
        setAge(0)
        setEmail('')
    }

    return (
        <div>
          

             <div>
                <label>Поиск по имени:</label>
                <input
                  type="text"
                  value={search}
                  placeholder="Введите имя"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={searchNAME}>НАЙТИ</button>
                <button type="button" onClick={() => setFilteredList(null)}>Сбросить</button>
              </div>
              <div>
                 {(filteredList ?? list).map((item) => (
                    <div key={item.id}>
                      <UserCard
                        name={item.name}
                        age={item.age}
                        email={item.email}
                        handleClick={() => handleClick(item.id)}
                      />
                    </div>
                  ))}
              </div>
            

           <form onSubmit={handleSubmit}>
             <h2>Форма добавления пользователя</h2>
             
             <div>
                <label>Имя:</label>
                <input
                 type="text" 
                 value={name}
                 placeholder="Введите имя"
                 onChange={(e)=>setName(e.target.value)}
                 required
                 />
             </div>

             <div>
                <label>Возраст:</label>
                <input
                 type="number" 
                 value={age || ''}
                 placeholder="Введите возраст"
                 onChange={(e)=>setAge(Number(e.target.value))}
                 required
                 />
             </div>

             <div>
                <label>Почта:</label>
                <input
                 type="text" 
                 value={email}
                 placeholder="Введите почту"
                 onChange={(e)=>setEmail(e.target.value)}
                 required
                 />
             </div>  
 
             <button type="submit">Добавить пользователя</button>
             <button onClick={()=>setList([])}>Очистить всех</button>

           </form>
        </div>
    )
}