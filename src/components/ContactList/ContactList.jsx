import { PropTypes } from 'prop-types';

export default function ContactList({ arrayContacts, removeContact }) {
  const items = arrayContacts.map(({ name, number, id }) => {
    return (
      <li key={id}>
        {name}: {number}{' '}
        <button onClick={() => removeContact(id)}>Delete</button>
      </li>
    );
  });
  return <ul>{items}</ul>;
}

ContactList.propTypes = {
  arrayContacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  removeContact: PropTypes.func.isRequired,
};
