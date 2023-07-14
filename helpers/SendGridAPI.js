const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, BASE_URL, FRONTEND_BASE_URL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (userEmail, verificationToken) => {
  const email = {
    from: "goosetrackservice@gmail.com",
    to: userEmail,
    subject: "Email verification",
    html: `
      <div>
        <h2>Greetings from GooseTrack Service Cats</h2>
        We are happy to see you! Please, verify your email by clicking on the
        link below:
        <a target="_blank" href="${BASE_URL}/api/auth/activate/${verificationToken}">${BASE_URL}/api/auth/activate/${verificationToken}</a>
      </div>
    `,
  };
  sgMail.send(email);
  return true;
};

const sendPasswordRecoveryEmail = async (userEmail, recoveryId) => {
  const email = {
    from: "goosetrackservice@gmail.com",
    to: userEmail,
    subject: "Password change verification",
    html: `
      <div>
        <h2>Greetings from GooseTrack Service Cats</h2>
        We are happy to see you! Please, follow the
        link below to change your password:
        <a target="_blank" href="${FRONTEND_BASE_URL}/recovery/${recoveryId}">${FRONTEND_BASE_URL}/recovery/${recoveryId}</a>
      </div>
    `,
  };
  sgMail.send(email);
  return true;
};

module.exports = { sendEmail, sendPasswordRecoveryEmail };
