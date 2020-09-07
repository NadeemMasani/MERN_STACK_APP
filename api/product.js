const { getDb, getNextSequence } = require('./db.js');

async function get(_, { id }) {
  const db = getDb();
  const product = await db.collection('products').findOne({ id });
  return product;
}
async function update(_, { id, changes }) {
  const db = getDb();
  if (changes.Name || changes.Price || changes.Image || changes.Category) {
    const product = await db.collection('products').findOne({ id });
    Object.assign(product, changes);
    // validate(product);
  }
  await db.collection('products').updateOne({ id }, { $set: changes });
  const savedIssue = await db.collection('products').findOne({ id });
  return savedIssue;
}

async function remove(_, id) {
  const db = getDb();
  console.log(id);
  const product = await db.collection('products').findOne(id);
  console.log(product);
  if (!product) return false;
  product.deleted = new Date();
  let result = await db.collection('deleted_products').insertOne(product);
  console.log(result.insertedId);
  if (result.insertedId) {
    result = await db.collection('products').removeOne(id);
    console.log(result.deletedCount);
    return result.deletedCount === 1;
  }
  return false;
}
async function add(_, { product }) {
  const db = getDb();
  const newProduct = { ...product };
  newProduct.id = await getNextSequence('products');
  const result = await db.collection('products').insertOne(newProduct);
  const savedIssue = await db.collection('products').findOne({ _id: result.insertedId });
  return savedIssue;
}
async function list() {
  const db = getDb();
  const prod = await db.collection('products').find({}).toArray();
  // console.log(prod);
  return prod;
}

async function report(_, { category, priceMin, priceMax }) {
  const db = getDb();
  const filter = {};
  if (category) filter.Category = category;
  if (priceMin !== undefined || priceMax !== undefined) {
    filter.Price = {};
    if (priceMin !== undefined) filter.Price.$gte = priceMin;
    if (priceMax !== undefined) filter.Price.$lte = priceMax;
  }
  const results = await db.collection('products').aggregate([
    { $match: filter },
    {
      $group: {
        _id: { Name: '$Name', Category: '$Category' },
        count: { $sum: 1 },
      },
    },
  ]).toArray();
  const stats = {};
  results.forEach((result) => {
    // eslint-disable-next-line no-underscore-dangle
    const { Name, Category: CategoryKey } = result._id;
    if (!stats[Name]) stats[Name] = { Name };
    stats[Name][CategoryKey] = result.count;
  });
  return Object.values(stats);
}

async function count() {
  const db = getDb();
  const productCount = {}
  const result =  await db.collection('products').aggregate([ { '$count': 'total' }]).toArray();
  // console.log(result[0].total);
  productCount.Total = result[0].total;
  return productCount;
}
module.exports = {
  add, list, get, update, delete: remove,report,count,
};
