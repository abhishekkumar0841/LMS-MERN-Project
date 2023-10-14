---Make sure to set "type": "module" in package.json for using es-6 module exports.
then you can able to export and import files like in react.. but make sure to always use files with extension for example:- import { register, login, logout, getProfile } from "../controllers/user.controller.js";

1. Creating first file in server folder-- server.js
   in server.js import app from app.js then fetch PORT environment variable from .env file and listen server on this app.

2. Creating second file app.js
   i). Import express
   ii). Import Cors
   iii). Cookie parser
   iv).
