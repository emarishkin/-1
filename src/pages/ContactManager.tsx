import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import type { Contact } from "../type/Contact";
import { ContactCard } from "../components/ContactCard";

export const ContactManager:FC = () => {
    
    const [contacts,setContacts] = useState<Contact[]>([])
    const [addContact,setAddContact] = useState({
        name:'',
        email:'',
        city:''
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAddContact({...addContact,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()

        const newContact:Contact = {
            id: Date.now(),
            name:addContact.name,
            email:addContact.email,
            city:addContact.city
        }

        setContacts([...contacts,newContact])
        setAddContact({...addContact})
    }

    const deleteContact = (id:number) => {
        setContacts(contacts.filter(item=>item.id!==id))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Добавление нового контакта</h2>
                
                <div>
                    <label>Имя:</label>
                    <input
                     name="name"
                     type="text"
                     value={addContact.name || ''}
                     onChange={handleChange}
                     required
                     />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                     name="email"
                     type="text"
                     value={addContact.email}
                     onChange={handleChange}
                     required
                     />
                </div>

                 <div>
                    <label>Город:</label>
                    <input
                     name="city"
                     type="text"
                     value={addContact.city}
                     onChange={handleChange}
                     required
                     />
                </div>

                <button type="submit">Добавить контакт</button>

            </form>

            <div>
                {contacts.length===0?(
                    <p>Контактов пока нет</p>
                ):(
                    contacts.map(item=>(
                        <ContactCard contact={item} OnDel={()=>deleteContact(item.id)} />
                    ))
                )}
            </div>

        </div>
    )
}