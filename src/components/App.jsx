import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { nanoid } from 'nanoid';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts && contacts.length) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = contact => {
    if (this.isDublicate(contact)) {
      return alert(`${contact.name} is already in contacts.`);
    }
    this.setState(prev => {
      const newContact = {
        id: nanoid(),
        ...contact,
      };
      return {
        contacts: [...prev.contacts, newContact],
      };
    });
  };

  removeContact = id => {
    this.setState(prev => {
      const newContact = prev.contacts.filter(item => item.id !== id);

      return {
        contacts: newContact,
      };
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  getFilteredContacts() {
    const { contacts, filter } = this.state;
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

  isDublicate({ name }) {
    const { contacts } = this.state;
    const resault = contacts.find(
      item => item.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
    return resault;
  }

  render() {
    const books = this.getFilteredContacts();
    const { addContact, removeContact, handleChange } = this;

    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact}></ContactForm>

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} handleChange={handleChange} />
        <ContactList arrayContacts={books} removeContact={removeContact} />
      </div>
    );
  }
}
