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
    .click('.material-icons')
    .waitForElementVisible('.message-board', 1000)
    .end();
  },
};
