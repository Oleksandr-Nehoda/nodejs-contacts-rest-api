const { Contact } = require("../db/contactModel");

const getAll = (_id, page, limit) => {
  return Contact.find({ owner: _id }, "", { limit: Number(limit) })
    .skip(page > 0 ? (page - 1) * limit : 0)
    .populate("owner", "_id  email subscription");
};

const getById = (id) => {
  return Contact.findById(id);
};

const add = (body, _id) => {
  return Contact.create({ ...body, owner: _id });
};

const removeById = (id) => {
  return Contact.findOneAndDelete({ _id: id });
};

const updateById = (id, body) => {
  return Contact.findByIdAndUpdate(id, body, {
    new: true,
  });
};

module.exports = {
  getAll,
  getById,
  add,
  removeById,
  updateById,
};
