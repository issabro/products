const express = require('express');
const https = require('https');

const PORT = 8080;

let URL = 'https://express.heartrails.com/api/json?method=getStations&line=東急田園都市線';

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));

app.get('/', (req, expressResult) => {
  https.get(URL, httpResult => {
    let body = '';
    httpResult.on('data', chunk => {
      body += chunk;
    });
    httpResult.on('end', res => {
      stationsInLine = JSON.parse(body).response.station;
      let stations = stationsInLine.map(s => s.name);
      expressResult.render('top.ejs', { stations: stations });
    });
  });
});

class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

let foods = new ProductDB();

foods.add("ポッキー", 280);
foods.add("きのこの山", 190);
foods.add("たけのこの里", 190);

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

app.listen(process.env.PORT || PORT);
