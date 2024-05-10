import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from '../models/Transaction.js'
import getCountryIso3 from "country-iso-2-to-3";

// is fn m hr product m jake uski id nikal k ProductStat table s uski puri detail nikali
export const getProducts = async (req, res) => {
    try {
      const products = await Product.find();
  
      const productsWithStats = await Promise.all(
        products.map(async (product) => {
          const stat = await ProductStat.find({
            productId: product._id,
          });
          return {
            ...product._doc,
            stat,
          };
        })
      );
  
      res.status(200).json(productsWithStats);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

export const  getCustomers = async (req, res) => {
    try {
      // users with the role "user" and selects all fields except the "password"
      const customers = await User.find({ role: "user" }).select("-password");
      res.status(200).json(customers);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  // ab tk humne getcustomer m client side pagination(data reflection in pages) ki thi bcoz data small amount m tha 
  // but ab transcation m bht bada data hoga to agr direct backend s bhej diya to load hone m bht time lgega 
  // so ab hum backend m hi logic likhenge aur sort krenge idhr hi aur data limited hi bhejenge taki 100 of 1000s m b 
  // data hua to b reflect hoga pages by pages so ye wale route m hum resp clint s leke b aaenge 

  // lets make route for above

  export const getTransactions = async (req, res) => {
    try {
      // sort should look like this: { "field": "userId", "sort": "desc"}
      const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
      // so all inputs has been taken from  frontend
        // formatted sort should look like { userId: -1 }
        const generateSort = () => {
          const sortParsed = JSON.parse(sort);
          const sortFormatted = {
            [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
          };
    
         return sortFormatted;
        };
          // below we are checking that if sort exist i.e 1 then generateSort otherwise do not do
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    // ab koi b agr search input m kch dalega to ye aise find krega
    const transactions = await Transaction.find({
      // we want to find transactions that match at least one of the conditions const or userid
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
    .sort(sortFormatted)
    .skip(page * pageSize)
    .limit(pageSize);
    
    //  now we want to show the whole data to that so count total
    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });
res.status(200).json({
  transactions,
  total,
});
} catch (error) {
res.status(404).json({ message: error.message });
}
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    // Overall, this below fn creates a map of user locations based on their country codes 
    // (in ISO 3 format) and counts the number of users from each country by iterating to all using reduce fn.

    const mappedLocations = users.reduce((acc, { country }) => {
      // This function likely takes a country code (e.g., "US") and converts it to the ISO 3166-1 Alpha-3 format (e.g., "USA").
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};




