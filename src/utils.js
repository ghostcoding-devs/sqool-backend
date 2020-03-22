const docMapper = docs => docs.map(doc => ({ ...doc.data(), id: doc.id }))

module.exports = {
  docMapper
}