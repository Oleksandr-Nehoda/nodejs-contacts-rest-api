const express = require("express");
const validete = require('../../middlewares/validation')
const {
  joiSchemaAddContact, 
  joiSchemaPutContact, 
  joiSchemaFavorite
} = require('../../db/contactModel')
const {
  getContacts, 
  addContact, 
  getContactById, 
  removeContact, 
  updateContact,
  updateStatusContact
} = require('../../controllers/contactsController')


const router = express.Router();

router.get("/", getContacts );
  
 router.get("/:contactId", getContactById);

router.post("/", validete(joiSchemaAddContact), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validete(joiSchemaPutContact), updateContact);

router.patch("/:contactId/favorite", validete(joiSchemaFavorite), updateStatusContact);

module.exports = router;
 