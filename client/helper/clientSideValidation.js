/**
* @description checks if the password is valid.
*
*
* @param  {string} str the string to be checked
*
* @return {boolean} true or false
*/

export const isValidPassword = (password) => {
  if (password.length < 9 ||
    !(/[0-9]/.test(password) &&
    /[a-z A-Z]/.test(password))) {
    return false;
  }
  return true;
};

/**
 * @description checks if the string pass in is a digit.
 * Means all the charcters are digit
 *
 * @param  {string} str the string to be checked
 *
 * @return {boolean} true or false
 */

export const isDigit = (str) => {
  const num = str.toString();
  if (num.length === 0) {
    return false;
  }
  for (let i = 0; i < num.length; i += 1) {
    if (/[0-9]/.test(num[i]) === false) {
      return false;
    }
  }
  return true;
};

/**
* @description checks if the text is valid.
*
*
* @param  {string} str the string to be checked
*
* @return {boolean} true or false
*/
export const isText = (str) => {
  if (str.length === 0) {
    return false;
  }
  for (let i = 0; i < str.length; i += 1) {
    if (/[a-z A-Z ' ']/.test(str[i]) === false) {
      return false;
    }
  }
  return true;
};

/**
 *@description checks if a field is null, undefined or empty
 *
 * @param  {type} fieldData the value to be checked if it is invalid
 *
 * @return {boolean} true or false
 */

export const isInValidField = (fieldData) => {
  if (typeof (fieldData) !== 'string' || fieldData.length === 0) {
    return true;
  }
  let hasValue = false;
  fieldData.split().forEach((value) => {
    if (value !== ' ') {
      hasValue = true;
    }
  });
  if (!hasValue) {
    return true;
  }
  return false;
};

/**
* @description checks if the email is valid.
*
*
* @param  {string} email
*
* @return {boolean} true or false
*/
export const isValidEmail = (email) => {
  if (isInValidField(email) || email.length < 7) {
    return false;
  } else if ((email.slice(email.length - 4, email.length)
     !== '.com' || !(/[@]/.test(email)))) {
    return false;
  }
  return true;
};

/**
* @description checks if the name is valid.
*
*
* @param  {string} name
*
* @return {boolean} true or false
*/
export const isValidName = (name) => {
  const testRegx = (/^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/).test(name);
  if (testRegx) {
    return true;
  }
  return false;
};
export const isValidUsername = (username) => {
  if (isDigit(username) ||
    isDigit(username[0]) || username.length < 2) {
    return false;
  }
  return true;
};
