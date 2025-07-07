import type { FC } from "react";

interface UserCardProps {
    name:string
    age:number
    email:string
    handleClick:()=>void
}

export const UserCard:FC<UserCardProps> = ({name,age,email,handleClick}) => {
    return (
       <div>
        {name},{age},{email}
        <button onClick={handleClick}>Удалить</button>
       </div>
    )
}