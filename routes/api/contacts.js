const express = require("express");
const {addContactValidation, putContactValidation} = require('../../middlewares/validationMiddleware');
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

router.post("/", addContactValidation, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", putContactValidation, updateContact);

router.patch("/:contactId/favorite", putContactValidation, updateStatusContact);

module.exports = router;
