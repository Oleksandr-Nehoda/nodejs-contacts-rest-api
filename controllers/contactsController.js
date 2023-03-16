const { Linter } = require('eslint');
const {
    getAll, 
    getById,
    add,
    removeById,
    updateById,
} = require('../services/contactServices');

const getContacts = async (req, res, next) => {
  try {
    const {_id} = req.user;
    const {page = 1, limit = 20} = req.query;
    const results = await getAll(_id, page, limit);
    res.json({
      statuse: "saccess",
      code: 200,
      contacts: results,
    });
  } catch (err) {
    console.log(`err in Controller`, err.message);
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getById(contactId);
    res.json({
      statuse: "saccess",
      code: 200,
      contact: result,
    });
  } catch (err) {
    console.log(`err in Controller`, err.message);
    next(err);
  }
};

const addContact = async (req, res, next) => {
  try {
    const body = req.body;
    const {_id} = req.user;
    const result = await add(body, _id);
    res.status(201).json({
      statuse: "saccess",
      code: 201,
      createContact: result,
    });
  } catch (err) {
    console.log(`err in Controller`, err.message);
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeById(contactId) ;
    res.json({
      statuse: "saccess",
      code: 200,
      removeContact: result,
    });
  } catch (err) {
    console.log(`err in Controller`, err.message);
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const result = await updateById(contactId, body) ;

    res.json({
      statuse: "saccess",
      code: 200,
      updateContact: result,
    });
  } catch (err) {
    console.log(`err in Controller`, err.message);
    next(err);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const result = await updateById(contactId, body);
   
    if (result) {
      res.json({
        statuse: "saccess",
        code: 200,
        updateContact: result,
      });
    } else {
      res.status(404).json({
        statuse: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (err) {
    console.log(`err in Controller`, err.message);
    next(err);
  }
};
module.exports = {
  getContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
  updateStatusContact,
};
