const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find((contact) => contact.id === contactId);
    if (!contactById) {
      return null;
    }
    return contactById;
  } catch (err) {
    console.error(`This is catch error: ${err}`);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const findId = contacts.find((contact) => contact.id === contactId);
    if (!findId) {
      return null;
    }
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    const updatedContactsJson = JSON.stringify(updatedContacts);
    await fs.writeFile(contactsPath, updatedContactsJson);
    const message = {message: "contact deleted"};
    return message;
  } catch (err) {
    console.error(`This is catch error: ${err}`);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      ...body,
    };
    contacts.push(newContact);

    const updatedContactsJson = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, updatedContactsJson);

    return newContact;
  } catch (err) {
    console.error(`This is catch error: ${err}`);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = { id: contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[index];
  } catch (err) {
    console.error(`This is catch error: ${err}`);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
