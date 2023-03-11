const {User} = require('../db/userModel');

const add = (body) => {
    return User.create({ ...body });
}

const findOne = (data) => { 
    return User.findOne(data);
}

module.exports = {
    add,
    findOne
}