import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { nanoid } from 'nanoid';

export default function App() {

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts && contacts.length) {
      setContacts(contacts);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

  const addContact = contact => {
    if (isDublicate(contact)) {
      return alert(`${contact.name} is already in contacts.`);
    }
    setContacts(prev => {
      const newContact = {
        id: nanoid(),
        ...contact,
      };
      return [...prev, newContact]
    });
  };


  const isDublicate = ({ name }) => {
    const resault = contacts.find(item => item.name.toLocaleLowerCase() === name.toLocaleLowerCase());
    return resault;
  }

  const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
  }

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLocaleLowerCase();

      const resault = normalizedName.includes(normalizedFilter);

      return resault;
    });
    return filteredContacts;
  }

  const removeContact = (id) => {
    setContacts(prev => {
      const newContact = prev.filter(item => item.id !== id);
      return newContact
    });
  };

  const filterContacts = getFilteredContacts();

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact}></ContactForm>

      <h2>Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactList arrayContacts={filterContacts} removeContact={removeContact} />
    </div>
  );
}