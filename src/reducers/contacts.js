import { UPDATE_CONTACTS } from '../actions/contacts';

const formatContacts = (contacts) => {
  let formattedContacts = [];
  contacts.forEach(({ name, phoneNumbers }) => {
    phoneNumbers.forEach(({ digits }) => {
      formattedContacts = [
        ...formattedContacts,
        {
          name,
          mobileNumber: digits,
        },
      ];
    });
  });

  return formattedContacts;
};

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CONTACTS: {
      const { contacts } = action;

      return formatContacts(contacts);
    }

    default: {
      return state;
    }
  }
};

export default reducer;
