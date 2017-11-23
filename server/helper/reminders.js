import nodemailer from 'nodemailer';
import moment from 'moment';

import { Task } from '../models/Todos';


/** Send mail
   * @desc send email so user can reset password
   *
   * @function sendMail
   *
   * @param {string} email user email
   *
   * @returns {object} Returns a success message
   */

export const sendReminders = (email, taskName, todoName) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  const mailOptions = {
    from: `Worklist <${process.env.EMAIL}`,
    to: email,
    subject: 'Worklist',
    html: `<p>Your task with task name ${taskName} in todo with todo name ${todoName}
    on <a href="http://${process.env.SITE_URL}">
    WorkList App </a> is Overdue. Please Complete this
    task in earnest </p>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
};

/**
 * @description: determines whether a reminder needs a notification at a
 * particular moment
 *
 * @param {Date} dueDate required object
 *
 * @return {void}
 */
export const requiresNotification = (dueDate) => {
  const newDate = new Date();
  const currentDate = new Date(moment(newDate).startOf('minute'));
  const currentDueDate = new Date(moment(dueDate).startOf('minute'));
  return (`${currentDate}` === `${currentDueDate}`);
};

/**
 * @description: send reminders via email and application
 *
 * @return {void}
 */
export const sendNotification = () => {
  Task.find({}, (err, tasks) => {
    if (err) throw err;
    if (tasks.length !== 0) {
      const requiresNotificationReminders = tasks
        .filter(task => requiresNotification(task.dueDate));
      requiresNotificationReminders.forEach((task) => {
        sendReminders(task.creatorEmail, task.text, task.todoName);
      });
    }
  });
};
