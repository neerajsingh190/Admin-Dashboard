import  express  from "express";
// bodyparser json m data conversion k liye
import bodyParser from "body-parser";
// mongodb s data shi tarike s ata rhe bs
import mongoose from "mongoose";
// kis website ki request leni h , kiski nhi vo decide krta h
import cors from 'cors'
import dotenv from 'dotenv'
//security threat s bachane kliye helmet 
import helmet from "helmet";
// morgan sari request ki detail rkhta h k kn si request kb hui h 
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";


// data imports
// user se schema import kr lia fir dataUser jo mock data h use insert kr denge mongodb m
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";

import {dataUser,
  dataProduct,
  dataProductStat,dataTransaction,
dataOverallStat} from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
// helmet s website khi b access hogi to safe hi h cross origin p
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//for request recoed we are using morgan
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

     /* ONLY ADD DATA ONE TIME */
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    //  ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
   // OverallStat.insertMany(dataOverallStat);
    
})
.catch((error) => console.log(`${error} did not connect`));