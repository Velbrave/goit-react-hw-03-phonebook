import React from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label} htmlFor="">
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
          />
        </label>
        <label className={css.label} htmlFor="">
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="XXX-XX-XX"
            value={number}
            onChange={handleChange}
          />
        </label>
        <button className={css.button} type="submit">
          add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;

ContactForm.protoTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  handleChange: PropTypes.func,
};
