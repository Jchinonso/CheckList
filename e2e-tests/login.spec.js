module.exports = {
  'Shows the login screen': function (client) {
    client
      .url('https://myworklist.herokuapp.com/')
      .waitForElementVisible('.nav-wrapper', 50000)
      .waitForElementVisible('div input[type=email]', 'johnson.chinonso19@gmail.com')
      .setValue('input[type=[email]]', 'johnsonchinonso19@gmail.com')
    client.end();
  },

};
