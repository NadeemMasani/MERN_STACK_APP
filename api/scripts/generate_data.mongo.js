/* global db print */
/* eslint no-restricted-globals: "off" */
db.products.remove({});
db.deleted_products.remove({});
db.counters.remove({});
 let Categories = ['Shirts','Jeans','Jackets','Sweaters','Accessories'];
 let Names = ['Levis', 'Armani', 'Calvin Klien', 'Addidas','Nike','Puma','New Ballance'];
 let Images = ['https://www.gstatic.com/webp/gallery3/1.png','https://www.gstatic.com/webp/gallery3/2.png','https://www.gstatic.com/webp/gallery3/3.png','https://www.gstatic.com/webp/gallery3/4.png','https://www.gstatic.com/webp/gallery3/5.png'];
 let incount = db.products.count();
for (let i = 0; i < 100; i += 1) {
  const Category = Categories[Math.floor(Math.random() * 5)];
  const Name = Names[Math.floor(Math.random() * 7)];
  const Price = Math.ceil(Math.random() * 200);
  const Image = Images[Math.floor(Math.random() * 5)];
  const id = incount + i + 1;
  const product = {
    Category, Name, Price, Image, id,
  };
  db.products.insertOne(product);
}
 let it  = db.products.count();
db.counters.insert({ _id: 'products', current: it });
print('New product count:', it);