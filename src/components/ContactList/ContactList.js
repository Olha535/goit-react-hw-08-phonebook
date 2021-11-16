import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ContactItem from './ContactItem';
import * as operations from '../../redux/phonebook-operations';
import { getVisibleContacts } from '../../redux/phonebook-selectors';
import { useSelector, useDispatch } from 'react-redux';
import s from './ContactList.module.css';

function ContactList() {
  const contacts = useSelector(getVisibleContacts);

  const dispatch = useDispatch();
  const deleteContact = id => dispatch(operations.deleteContact(id));

  useEffect(() => {
    dispatch(operations.fetchContacts());
  }, [dispatch]);

  return (
    <ul className={s.contactList}>
      {contacts.map(({ id, name, number }) => (
        <ContactItem
          name={name}
          number={number}
          deleteContact={deleteContact}
          key={id}
          id={id}
        />
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  deleteContact: PropTypes.func,
};

export default ContactList;
