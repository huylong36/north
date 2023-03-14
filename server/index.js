const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const authRouter = require('./routers/auth');
const productRouter = require('./routers/products');
require('dotenv').config();

const URL = 'mongodb+srv://huylong:Dohuylong2000@cluster0.oakvtzn.mongodb.net/?retryWrites=true&w=majority'

const connectDB = async () => {
    try {
        await mongoose.connect(URL, {

            useNewUrlParser: true,
            useUnifiedTopology: true,

        });

        console.log('Mongoose connected');
    } catch (error) {
        console.log('error', error);
        process.exit(1)
    }
}
connectDB();
const app = express();

const corsOptions = {
    origin: 'http://localhost:3003',
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json())
app.use('/', authRouter)
app.use('/', productRouter)
const PORT = process.env.port || 5000
app.listen(PORT, () => console.log(`Sever started on PORT ${PORT}`));