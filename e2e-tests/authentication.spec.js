module.exports = {
  'sign up a user': function (browser) {
    browser
      .url('localhost:5000')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('a#toggle-signup', 1000)
      .click('#toggle-signup')
      .waitForElementVisible('.header2', 1000)
      .setValue('#name', 'tayo akande')
      .setValue('#username', 'philjoe')
      .setValue('#email', 'tyakande@gmail.com')
      .setValue('#password', 'password1234')
      .waitForElementVisible('.btn', 1000)
      .click('.btn')
      .pause(1000)
      .end();
  },
  'sign in a user': function (browser) {
    browser
      .url('localhost:5000')
      .waitForElementVisible('body', 1000)
      .setValue('#email', 'jdoe@gmail.com')
      .setValue('#password', 'password1234')
      .waitForElementVisible('#btn-click', 1000)
      .click('#btn-click')
      .pause(1000)
      .end();
  }
};
