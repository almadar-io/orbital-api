import users from './seeds/users.js';
import blogs from './seeds/blogs.js';
import events from './seeds/events.js';
import settings from './seeds/settings.js';
import products from './seeds/products.js';
import categories from './seeds/categories.js';

import userModel from './models/user.js';
import cartsModel from './models/carts.js';
import ordersModel from './models/orders.js';
import chatLogModel from './models/chat-log.js';
import blogModel from './models/blog.js';
import productsModel from './models/products.js';
import settingsModel from './models/settings.js';
import eventsModel from './models/events.js';
import categoriesModel from './models/categories.js';
import mongoose from 'mongoose';
import config from 'config';

mongoose
  .connect(`${config.get("db.host")}`, {
    dbName: "orbital"
  })
  .then(models => {
    console.log("connected to db");
  })
  .catch(err => {
    if (err) return console.error(err);
  }); // connect to database

async function seed(Model, seedData) {
  let removed = await Model.remove({ isASeed: true });
  await Promise.all(
    seedData.map(async d => {
      let data = new Model(d);
      let savedData = await data.save();
      console.log("saved data", savedData);
      return savedData;
    })
  );
}

async function seedCartsOrOrders(Model) {
  //find a user and 3 products
  await Model.remove({ isASeed: true });
  let user = await userModel.findOne({ name: "Test Name 1" });
  let products = await productsModel.find({ isASeed: true });
  let order = new Model({
    user: user._id,
    products: products.map(({ _id }) => _id),
    isASeed: true
  });
  let savedOrder = await order.save();
}

async function runSeeds() {
  await seed(blogModel, blogs);
  await seed(settingsModel, settings);
  await seed(eventsModel, events);
  await seed(productsModel, products);
  await seed(userModel, users);
  await seed(categoriesModel, categories);
  await seedCartsOrOrders(cartsModel);
  await seedCartsOrOrders(ordersModel);
  process.exit(0);
}

export default runSeeds;