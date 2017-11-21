module.exports = {
  'Users should be able to sign up': function (browser) {
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
      .assert.urlEquals(`${'http://localhost:5000/dashboard'}`)
      .pause(1000)
      .end();
  },
  'Users should be able to sign in a user': function (browser) {
    browser
      .url('localhost:5000')
      .waitForElementVisible('body', 1000)
      .setValue('#email', 'jdoe@gmail.com')
      .setValue('#password', 'password1234')
      .waitForElementVisible('#btn-click', 1000)
      .click('#btn-click')
      .assert.urlEquals(`${'http://localhost:5000/dashboard'}`)
      .assert.containsText('.brand-log', 'Work List')
      .pause(1000)
      .end();
  },
  'Users should be able to log out': function (browser) {
    browser
      .url('localhost:5000')
      .waitForElementVisible('body', 1000)
      .setValue('#email', 'jdoe@gmail.com')
      .setValue('#password', 'password1234')
      .waitForElementVisible('#btn-click', 1000)
      .click('#btn-click')
      .waitForElementVisible('.caption', 1000)
      .click('.sign-out')
      .assert.urlEquals(`${'http://localhost:5000'}`)
      .pause(1000)
      .end();
  },

};
