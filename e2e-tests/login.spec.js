module.exports = {
  'Shows the login screen': function (client) {
    client
      .url('https://myworklist.herokuapp.com/')
      .waitForElementVisible('#email', 50000)
      .setValue('#email', 'johnsonchinonso19@gmail.com')
      .setValue('#password', 'poly12345')
    client.end();
  },

};
