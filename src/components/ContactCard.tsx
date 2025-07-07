import type { FC } from "react";
import type { Contact } from "../type/Contact";

interface ContactCardProps{
    contact:Contact
    OnDel:()=>void
}

export const ContactCard:FC <ContactCardProps> =  ({contact,OnDel}) => {
    return(
        <div>
           <p>{contact.name}</p>
           <p>{contact.email}</p>
           <p>{contact.city}</p>
           <button onClick={OnDel}>Удалить контакт</button>
        </div>
    )
}