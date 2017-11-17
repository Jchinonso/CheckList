module.exports = {
  'Add Todo collaborators': function (browser) {
    browser
      .url('localhost:5000')
      .waitForElementVisible('body', 1000)
      .setValue('#email', 'jdoe@gmail.com')
      .setValue('#password', 'password1234')
      .waitForElementVisible('#btn-click', 1000)
      .click('#btn-click')
      .pause(2000)
      .waitForElementVisible('.message-board', 1000)
      .click('.collaborator')
      .pause(3000)
      .waitForElementVisible('#add-user', 1000)
      .setValue('#email', 'jdoe@gmail.com')
      .end();
  },
};
