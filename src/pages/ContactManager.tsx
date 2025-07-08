import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import type { Contact } from "../type/Contact";
import { ContactCard } from "../components/ContactCard";

export const ContactManager:FC = () => {
    
    const [search,setSearch] = useState<string>('')
    const [filterList,setFilterList] = useState<Contact[] | null>(null)

    const [selectedCity,setSelectedCity] = useState<string>('all')

    const [contacts,setContacts] = useState<Contact[]>([])
    const [addContact,setAddContact] = useState({
        name:'',
        email:'',
        city:''
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
       const {name,value} = e.target
       if(name === 'search'){
        setSearch(value)
       } else {
        setAddContact({...addContact,[name]:value})
       }

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
        setAddContact({name:'',email:'',city:''})
    }

    const deleteContact = (id:number) => {
        setContacts(contacts.filter(item=>item.id!==id))
    }

    const applyFilters = () => {
        let filtred = [...contacts]

        if(search.trim()){
            filtred = filtred.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if(selectedCity !== 'all'){
            filtred = filtred.filter(item=> item.city === selectedCity)
        }
        setFilterList(filtred?filtred:null)
    }

     const resetFilters = () => {
        setFilterList(null);
        setSearch('');
        setSelectedCity('all');
    };

    const getUniqueCities = () => {
        const cities = contacts.map(item => item.city)
        return ['all',...new Set(cities)]
    }

    const displayContacts = filterList || contacts

    return (
        <div>
            
            <div>
                <label>Поиск по имени:</label>
                <input
                name="search"
                type="text"
                value={search}
                onChange={handleChange}
                required
                />
                <button onClick={applyFilters}>Найти</button>

                <div>
                    {(filterList || selectedCity !== 'all') && (
                        <div>
                            <button type="button" onClick={()=>resetFilters()}>Сбросить</button>
                        </div>
                    )}
                </div>

            </div>

            <div>
                <label>Фильтр по городу:</label>
                <select
                name="cityFilter"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                >
                {getUniqueCities().map(city=>(
                    <option value={city}>
                        {city === 'all'?'все города':city}
                    </option>
                ))}
                </select>
            </div>


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
                <h2>{filterList?'Результаты поиска':'список контактов'}</h2>
                {displayContacts.length === 0?(
                    <p>Нет контактов</p>
                ):(
                    <div>
                        {displayContacts.map(item=>(
                            <ContactCard contact={item} OnDel={()=>deleteContact(item.id)} />
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}