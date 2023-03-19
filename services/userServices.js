const {User} = require('../db/userModel');

const add = (body) => {
    return User.create({ ...body });
}

const findOne = (data) => { 
    return User.findOne(data);
}

const updateById = (id, date) => {
    return User.findByIdAndUpdate(id, date, {new: true})
}

module.exports = {
    add,
    findOne,
    updateById
}