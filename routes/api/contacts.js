const express = require("express");
const {validation, verifyToken} = require('../../middlewares')
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

router.get("/", verifyToken, getContacts );
  
router.get("/:contactId", getContactById);

router.post("/", verifyToken, validation(joiSchemaAddContact), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validation(joiSchemaPutContact), updateContact);

router.patch("/:contactId/favorite", validation(joiSchemaFavorite), updateStatusContact);

module.exports = router;
 