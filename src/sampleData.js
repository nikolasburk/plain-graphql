/**
 * Dummy data
 */

const users = [{
  id: "abc",
  name: "Sarah"
}, {
  id: "def",
  name: "Johnny"
}]

module.exports = function fetchUserById(id) {
  return users.find(user => user.id === id)
}
