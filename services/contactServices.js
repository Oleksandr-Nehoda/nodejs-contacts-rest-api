const { Contact } = require("../db/contactModel");

const getAll = () => {
    return Contact.find({});
}

const getById = (id) => {
    return Contact.findById(id);
}

const add = (body) => {
    return Contact.create({ ...body });
}

const removeById = (id) => {
    return Contact.findOneAndDelete({ _id: id });
}

const updateById = (id, body) => {
    return Contact.findByIdAndUpdate(id, body, {
        new: true,
      });
}

module.exports = {
    getAll,
    getById,
    add,
    removeById,
    updateById,
}