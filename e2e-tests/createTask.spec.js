module.exports = {
  'Users should be able to Create Task': function (browser) {
    browser
      .url('localhost:5000')
      .waitForElementVisible('body', 1000)
      .setValue('#email', 'jdoe@gmail.com')
      .setValue('#password', 'password1234')
      .waitForElementVisible('#btn-click', 1000)
      .click('#btn-click')
      .pause(2000)
      .waitForElementVisible('.caption', 1000)
      .click('.caption')
      .waitForElementVisible('#modal1', 2000)
      .setValue('#group_name', 'new todo')
      .click('.btn-flat')
      .pause(2000)
      .waitForElementVisible('#dashboard', 2000)
      .click('#dashboard')
      .setValue('#left-input', 'new task')
      .click('#create-task')
      .pause(2000)
      .end();
  },
};
