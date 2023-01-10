import React from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm ';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmitData = ({ name, number }) => {
    const userId = nanoid();
    const contact = { id: userId, name, number };

    this.state.contacts.find(contact => contact.name === name)
      ? alert('This contact already exists')
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, contact],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  filteredrContact = () => {
    const normalizeFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  render() {
    const visibleContact = this.filteredrContact();
    const { handleSubmitData, changeFilter, deleteContact } = this;

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleSubmitData} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={changeFilter} />
        <ContactList
          contacts={visibleContact}
          onDeleteContact={deleteContact}
        />
      </div>
    );
  }
}
