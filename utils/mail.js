const EMAIL_SEND =process.env.EMAIL_SEND;

const mailOptions = (email, resetUrl) => ({
    to: email,
    from: EMAIL_SEND,
    subject: 'Password Reset Request',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${resetUrl}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
});
module.exports = mailOptions;