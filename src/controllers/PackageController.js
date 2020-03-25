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
  const { classId, exercises, name, due } = req.body
  const package = await packageService.createPackage({
    classId,
    name,
    exercises,
    due: new Date(due) / 1000,
    createdAt: parseInt(Date.now() / 1000)
  })
  // mailService.sendNewPackageMailToClass(classId, exercises.length)
  return res.json(package)
}

module.exports = {
  getPackage,
  listClassPackages,
  createPackage
}