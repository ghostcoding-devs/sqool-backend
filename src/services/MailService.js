const config = require('config')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(config.get('SENDGRID.APIKEY'))

module.exports = (to, subject, text) => {
  sgMail.send({
    to,
    from: config.get('SENDGRID.MAIL'),
    subject,
    text
  })
}
