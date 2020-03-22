const { packageService, mailService } = require('../services')

const getPackage = async (req, res) => {
  const { id } = req.params
  const package = await packageService.getPackage(id)
  return res.json(package)
}

const listClassPackages = async (req, res) => {
  const { classId } = req.params
  const packages = await packageService.getPackagesByClass(classId)
  return res.json(packages)
}

const createPackage = async (req, res) => {
  const { classId, exercises, due } = req.body
  const package = await packageService.createPackage({
    classId,
    exercises,
    due
  })
  mailService.sendNewPackageMailToClass(classId, exercises.length)
  return res.json(package)
}

module.exports = {
  getPackage,
  listClassPackages,
  createPackage
}