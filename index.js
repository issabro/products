const express = require('express');
const app = express();
const PORT = 8080;

class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class ProductDB {
  constructor() {
    this.productNum = 0;
    this.products = [];
  }

  add(name, price) {
    this.products.push(new Product(this.productNum, name, price));
    this.productNum++;
  }
}

let foods = new ProductDB();

foods.add("ポッキー", 280);
foods.add("きのこの山", 190);
foods.add("たけのこの里", 190);

app.get('/', (req, res) => {
  res.contentType('json');
  res.header('Access-Control-Allow-Origin', '*');
  res.send({ result: foods.length, data: foods });
});

app.get('/request', (req, res) => {
  let result = { err: "", result: 0, data: [] }
  res.contentType('json');
  res.header('Access-Control-Allow-Origin', '*');
  
  if(req.query.cmd = "search"){
    foods.products.forEach(e => {
      if (e.name == req.query.name) {
        result.result++;
        result.data.push(e);
      }
    });
    res.send(result);
  }

  if(req.query.cmd = "all"){
    res.send({ result: foods.length, data: foods });
  }

});

app.get('/add', (req, res) => {
  const name = req.query.name;
  const price = parseInt(req.query.price);

  if (name && price) {
    foods.add(name, price);
    res.send({ result: "Success" });
  } else {
    res.send({ result: "Invalid data" });
  }
});

app.listen(process.env.PORT || PORT);