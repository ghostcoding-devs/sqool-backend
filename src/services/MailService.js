const config = require('config')
const sgMail = require('@sendgrid/mail')
const { getUser } = require('./UserService')
const { getStudentsByClass } = require('./StudentService')

sgMail.setApiKey(config.get('SENDGRID.APIKEY'))

const sendMail = (to, subject, text) => {
  sgMail.send({
    to,
    from: config.get('SENDGRID.MAIL'),
    subject,
    text
  })
}

const sendNewPackageMailToClass = async (classId, amountOfExercises) => {
  const students = await getStudentsByClass(classId)
  for (student of students) {
    const parent = await getUser(student.parentId)
    sendMail(
      parent.email,
      'Es wurde ein neues Arbeitspaket angelegt',
      `Ein Arbeitspaket mit ${amountOfExercises} Übunge wurde angelegt.`
    )
  }
}

module.exports = {
  sendNewPackageMailToClass
}
