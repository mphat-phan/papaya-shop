import faker from 'faker';
import axios from 'axios';
import brands from './brands.js';
import categories from './categories.js';

const getImages = async (startPage, endPage) => {
  let images = [];
  for (let i = startPage; i <= endPage; i++) {
    let {
      data: { results },
    } = await axios.get('https://api.unsplash.com/search/photos', {
      headers: {
        Authorization: 'Client-ID 7MIYwi-TxGNNuPO0Dldu2HYqJDy34TcXYW54wze-Z9M',
      },
      params: {
        query: 'fashion model',
        page: i,
        per_page: 30,
        orientation: 'portrait',
      },
    });

    let urls = results.map((image) => image.urls.regular);
    images = [...images, ...urls];
  }
  return images;
};

function randomSale() {
  let rate = Math.random();
  if (rate <= 0.8) {
    return 0;
  } else {
    //random sale from 5 - 50
    return Math.floor(Math.random() * (50 - 5) + 5);
  }
}


const products = [
  {
    "name": "Tie Front Blouse",
    "images": [
      "https://res.cloudinary.com/dnkhiiz0b/image/upload/v1650996725/fashionshop/products/zjxlnjzeijatpszjo1vu_sq9wcp.jpg",
      "https://res.cloudinary.com/dnkhiiz0b/image/upload/v1650996725/fashionshop/products/zxluu80hfeziryupv5ub_jg4odn.jpg",
    ],
    "description": `Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.

      Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.`,
    "brand": "Prada",
    "category": "Women's Shirts",
    "price": 157.58,

    "rating": 4.5,
    "sale": 0,
    "numReviews": 0,
  },
  {
    name: "Tye Shorts – Found On The Beach Slim carrot fit",
    "images": [
      "https://res.cloudinary.com/dnkhiiz0b/image/upload/v1650996722/fashionshop/products/pjowyeiudm5c1towpnnr_y40gdp.jpg",
      "https://res.cloudinary.com/dnkhiiz0b/image/upload/v1650996722/fashionshop/products/snfutmoi6jmsxekjzug1_ylncad.jpg",
    ],
    "description": `Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.

    Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.`,
    "brand": "Chanel",
    "category": "T-Shirt",
    "price": 109.0,

    "rating": 5,
    "sale": 20,
    "numReviews": 0,
  },
  {
    name: "Structured Hawaii Shirt Regular fit",
    "images": [
      "https://res.cloudinary.com/dnkhiiz0b/image/upload/v1650996723/fashionshop/products/umjuo2gy2fdl3qn2zv0m_sinhw5.jpg",
      "https://res.cloudinary.com/dnkhiiz0b/image/upload/v1650996724/fashionshop/products/xwqfbu3lowou4o6kbup5_e3vxvj.jpg",
    ],
    "description": `Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.`,
    "brand": "Dior",
    "category": "Men's Shirts",
    "price": 172.6,

    "rating": 4,
    "sale": 5,
    "numReviews": 0,
  },
  {
    name: "Sleeveless Pleated Top",
    "images": [
      "https://res.cloudinary.com/dnkhiiz0b/image/upload/v1650996724/fashionshop/products/scrqtzacgahwueagnule_gdwlfk.jpg",
      "https://res.cloudinary.com/dnkhiiz0b/image/upload/v1650996723/fashionshop/products/thu3zsymrds5qqjhf9oq_qkzjpi.jpg",
    ],
    "description": `Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.`,
    "brand": "Dior",
    "category": "Clothes",
    "price": 110.23,

    "rating": 5,
    "sale": 0,
    "numReviews": 0,
  },
  {
    name: "Suede Trucker Jacket",
    "images": [
      "https://res.cloudinary.com/dnkhiiz0b/image/upload/v1650996723/fashionshop/products/s46bcnai6fmkva5egzjt_xcgmac.jpg",
      "https://res.cloudinary.com/dnkhiiz0b/image/upload/v1650996721/fashionshop/products/ri8syosakuni5ej693hm_uzwrws.jpg",
    ],
    "description": `Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.`,
    "brand": "Chanel",
    "category": "Trousers",
    "price": 124.85,
    "rating": 5,
    "sale": 10,
    "numReviews": 0,
  },
];

getImages(1, 2)
  .then((imagesFashion) => {
    for (let i = 0; i < 15; i++) {
      products.push({
        name: faker.commerce.productName(),
        images: imagesFashion.slice(4 * i, 4 * i + 4),
        description: faker.lorem.paragraphs(),
        brand: brands[Math.floor(Math.random() * brands.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        price: faker.commerce.price(),
        rating: Math.floor(Math.random() * (5 - 0) + 0),
        sale: randomSale(),
        numReviews: 1,
        countInStock: 0,
      });
    }
  })
  .catch((error) => console.log(error));

export default products;
