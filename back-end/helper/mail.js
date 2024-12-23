const nodemailer = require("nodemailer");

const sendMail = (email, emailToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "tranvannghiep04@gmail.com",
      pass: "bqwj zmnn kvxy hxrb",
    },
  });

  const mailOptions = {
    from: '"Dream IT Jobs" <dreamItJobs@gmail.com>',
    to: `${email}`,
    subject: "Xác minh tài khoản của bạn ...",
    html: `<p>Xin chào, xác minh tài khoản của bạn bằng cách click vào link </p>
        <br>
        <a href="http://localhost:5173/verify-email?emailToken=${emailToken}">Click here to verify</a>
        `,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;
