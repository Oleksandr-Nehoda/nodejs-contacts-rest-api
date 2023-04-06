const sgEmail = require('@sendgrid/mail');

const {SENDGRID_API_KEY} = process.env;

sgEmail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    try {
        const email = {...data, from:"iamsoul@ukr.net"};
        await sgEmail.send(email);
        return true;
    } catch (error) {
        throw error
    }
}

module.exports = sendEmail;