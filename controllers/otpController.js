var dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const EmailVarify = require('../models/otpModel.js');
const User = require('../models/userModel');
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
dotenv.config({ path: "./config.env" });
const EMAIL = process.env.EMAIL;
const PASS = process.env.Email_otp_pass;


function generateOTP() {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

const sendOtpForPasswordChange = async (req, res, next) => {
    try {
      let email = req.body.email;
      const mail = await User.findOne({ email: email });
      if (!mail) {
        res.status(404).json({
            status: 404,
            success: false,
            message: "this is not a valid email address",
            data: null,
          });
        error.statusCode = 404;
        return next(error);
      } else {
        const random = generateOTP();
        const otpData = new EmailVarify({
          email: email,
          code: random,
          expireIn: new Date().getTime() + 60 * 10000,
        });
  
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: EMAIL,
            pass: PASS,
          },
        });
  
      
  
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Password Reset Request - Verify Your Email",
          content: "Otp Code: " + random,
        };
  
        await transporter.sendMail(mailOptions);
        await otpData.save();
        res.status(201).json({
          status: 201,
          success: true,
          message: "OTP sent successfully",
          data: { Otp: random },
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
const passwordOtpVarify =async (req, res, next) => {
    try {
      const email = req.body.email;
      const code = req.body.code;
      const mail = await EmailVarify.findOne({ code: code, email: email });
      if (mail) {
        const currentTime = new Date().getTime();
        const Diff = mail.expireIn - currentTime;
        if (Diff < 0) {
          res.status(401).json({
            status: 401,
            success: false,
            message: "otp expire with in 5 mints",
            data: null,
          });
        } else {
          res.status(200).json({
            status: 200,
            success: true,
            message: "password otp varification successful",
            data: null,
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          success: false,
          message: "Invalid Otp",
          data: null,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid Otp",
        data: null,
      });
    }
  }
const changePassword =  async (req, res, next) => {
    try {
      const email = req.body.email;
      const mailVarify = await User.findOne({ email: email });
      const password = req.body.password;
      const ismatch = await bcrypt.compare(password, mailVarify.password);
      console.log(ismatch);
      mailVarify.password = password;
      const registered = await mailVarify.save();
      res.status(201).json({
        status: 201,
        success: true,
        message: "password change successful",
        data: null,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: 400,
        success: false,
        message: "Invalid email",
        data: null,
      });
    }
  }

  module.exports = {
    changePassword,
    sendOtpForPasswordChange,
    passwordOtpVarify
  };