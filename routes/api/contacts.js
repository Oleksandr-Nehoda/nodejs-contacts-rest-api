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
  
router.get("/:contactId", verifyToken, getContactById);

router.post("/", verifyToken, validation(joiSchemaAddContact), addContact);

router.delete("/:contactId", verifyToken, removeContact);

router.put("/:contactId", verifyToken, validation(joiSchemaPutContact), updateContact);

router.patch("/:contactId/favorite", verifyToken, validation(joiSchemaFavorite), updateStatusContact);

module.exports = router;
 