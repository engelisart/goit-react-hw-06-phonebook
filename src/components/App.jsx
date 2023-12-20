import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { BookContacts, ContactsTitle } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, searchContact } from 'store/createSlice';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.phonebook.contacts);
  const filter = useSelector(state => state.phonebook.filter);

  const handleAddContact = newContact => {
    dispatch(addContact(newContact));
  };

  const handleFilterChange = event => {
    dispatch(searchContact(event.target.value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const filteredContacts = getFilteredContacts();

  return (
    <BookContacts>
      <h1>Phonebook</h1> <br />
      <ContactForm addContact={handleAddContact} />
      <div>
        <ContactsTitle>Contacts</ContactsTitle> <br />
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </BookContacts>
  );
};
