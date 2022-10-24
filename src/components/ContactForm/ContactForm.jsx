import { useState } from 'react';
import css from '../ContactForm/ContactForm.module.css';
import { PropTypes } from 'prop-types';
import { nanoid } from 'nanoid';

export default function ContactForm({ onSubmit }) {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const nameId = nanoid();
    const numberId = nanoid()

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {

            case 'name':
                setName(value);
                break;

            case 'number':
                setNumber(value);
                break

            default:
                return;
        }
    }

    const handleContact = (e) => {
        e.preventDefault();
        onSubmit({ name, number });
        setName('');
        setNumber('');
    }

    return (
        <div className={css.contactForm}>
            <form onSubmit={handleContact}>
                <div className={css.contactFormBlock}>
                    <label className={css.contactFormInput} htmlFor={nameId}>
                        Name
                    </label>
                    <input
                        id={nameId}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className={css.contactFormBlock}>
                    <label className={css.contactFormInput} htmlFor={numberId}>
                        Number
                    </label>
                    <input
                        id={numberId}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        value={number}
                        onChange={handleChange}
                    />
                </div>
                <button className={css.btnContactForm}>Add contact</button>
            </form>
        </div>
    );
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};