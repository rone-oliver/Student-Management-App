import express from "express";
import studentRoute from "./routes/studentRoute.js";
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = 5005;

app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',studentRoute);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});