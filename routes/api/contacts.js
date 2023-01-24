const express = require("express");
const {addContactValidation, putContactValidation} = require('../../middlewares/validationMiddleware')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");


const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await listContacts());
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const getContById = await getContactById(contactId)
    if(!getContById) {
      next()
    }
    res.json(getContById);
  } catch (err) {
    next(err);
  }
});

router.post("/", addContactValidation, async (req, res, next) => {
  try {
    const body = req.body;
    res.status(201);
    res.json(await addContact(body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeCont = await removeContact(contactId);
    if(!removeCont) {
      next()
    }
    res.json(removeCont);
  } catch (err) {
    console.log(`this is catch, ${err}`);
    next(err);
  }
});

router.put("/:contactId", putContactValidation, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const updateCont = await updateContact(contactId, body);
    if(!updateCont) {
      res.status(404).json({ message: 'Not found' })
    }
    res.json(updateCont);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
