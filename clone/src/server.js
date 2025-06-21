
// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const googleTrends = require('google-trends-api');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Prevent caching on all responses (especially your API endpoints)
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

const USERS_CSV = path.join(__dirname, 'USERID.csv');
const INVENTORY_JSON = path.join(__dirname, '../public/inventory.json');
const CUSTOMER_CSV = path.join(__dirname, '..', 'customer.csv');

const readCSV = (filePath) =>
  new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });

const readJSON = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return reject(err);
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(e);
      }
    });
  });

const writeJSON = (filePath, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

// User signup route
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Missing fields' });

  try {
    const users = fs.existsSync(USERS_CSV) ? await readCSV(USERS_CSV) : [];
    const existing = users.find(
      (u) => (u.email || '').trim().toLowerCase() === email.trim().toLowerCase()
    );
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const sn = users.length + 1;
    const userId = `u${sn.toString().padStart(3, '0')}`;
    const line = `${sn},${userId},${email.trim()},${password.trim()},${name.trim()}\n`;

    if (!fs.existsSync(USERS_CSV)) {
      const header = 'sn.no,user-id,email,password,name\n';
      fs.writeFileSync(USERS_CSV, header);
    }

    fs.appendFileSync(USERS_CSV, line);
    res.json({ success: true });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// User signin route
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Missing email or password' });

  try {
    const users = await readCSV(USERS_CSV);
    const match = users.find(
      (u) =>
        (u.email || '').trim().toLowerCase() === email.trim().toLowerCase() &&
        (u.password || '').trim() === password.trim()
    );

    if (match) return res.json({ success: true });
    else return res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

let categoryTrendScores = {};

async function fetchTrendScore(keyword) {
  try {
    const results = await googleTrends.interestOverTime({
      keyword,
      startTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      geo: '',
    });
    const data = JSON.parse(results);
    if (!data.default || !data.default.timelineData) return 0;
    const scores = data.default.timelineData.map((d) => d.value[0]);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    return avgScore;
  } catch (err) {
    console.error('Google Trends fetch error:', err);
    return 0;
  }
}

async function updateCategoryTrends() {
  try {
    const inventory = await readJSON(INVENTORY_JSON);
    const categories = [...new Set(inventory.map((item) => item.product_category))];
    for (const cat of categories) {
      const score = await fetchTrendScore(cat);
      categoryTrendScores[cat] = score;
    }
    console.log('Updated Google Trends scores:', categoryTrendScores);
  } catch (e) {
    console.error('Error updating trends:', e);
  }
}

// Initial fetch and periodic update every hour
updateCategoryTrends();
setInterval(updateCategoryTrends, 60 * 60 * 1000);

// Calculate dynamic price with minimum 1% discount and max 20%, never below cost price
function getDynamicPrice(basePrice, sellingPrice, trendScore) {
  const maxDiscountPercent = 0.20; // max 20%
  const factor = trendScore / 100;

  const trendDiscount = maxDiscountPercent * factor;
  const minDiscount = 0.01;

  const effectiveDiscount = Math.max(minDiscount, trendDiscount);

  let dynamicPrice = sellingPrice * (1 - effectiveDiscount);

  if (dynamicPrice < basePrice) {
    dynamicPrice = basePrice;
  }

  return parseFloat(dynamicPrice.toFixed(2));
}

// Discount % = difference between selling price and dynamic price relative to selling price
function getDiscountPercent(sellingPrice, dynamicPrice) {
  if (!sellingPrice || !dynamicPrice || dynamicPrice >= sellingPrice) return 0;
  return Math.round(((sellingPrice - dynamicPrice) / sellingPrice) * 100);
}

// Products route
app.get('/products', async (req, res) => {
  try {
    const inventory = await readJSON(INVENTORY_JSON);
    const products = inventory.map((item) => {
      const basePrice = parseFloat(item.base_price) || 0;
      const sellingPrice = parseFloat(item.selling_price) || 0;
      const trendScore = categoryTrendScores[item.product_category] || 0;
      const dynamicPrice = getDynamicPrice(basePrice, sellingPrice, trendScore);
      const discountPercent = getDiscountPercent(sellingPrice, dynamicPrice);

      return {
        ...item,
        dynamicPrice,
        discountPercent,
      };
    });
    res.json({ products });
  } catch (err) {
    console.error('Error loading products:', err);
    res.status(500).json({ error: 'Failed to load products' });
  }
});

// Calculate dynamic price with min 1% discount, max 20%, never below cost price
function getDynamicPrice(sellingPrice, trendScore, basePrice = 0) {
  const maxDiscountPercent = 0.20; // max 20%
  const factor = trendScore / 100;

  const trendDiscount = maxDiscountPercent * factor;
  const minDiscount = 0.01; // min 1%

  const effectiveDiscount = Math.max(minDiscount, trendDiscount);

  let dynamicPrice = sellingPrice * (1 - effectiveDiscount);

  if (dynamicPrice < basePrice) {
    dynamicPrice = basePrice;
  }

  return parseFloat(dynamicPrice.toFixed(2));
}

// Discount % based on selling price vs dynamic price
function getDiscountPercent(sellingPrice, dynamicPrice) {
  if (!sellingPrice || !dynamicPrice || dynamicPrice >= sellingPrice) return 0;
  return Math.round(((sellingPrice - dynamicPrice) / sellingPrice) * 100);
}

// Pricing API route
app.get('/api/pricing/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const inventory = await readJSON(INVENTORY_JSON);
    const product = inventory.find((p) => p.product_id === id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const basePrice = parseFloat(product.base_price) || 0;      // cost price
    const sellingPrice = parseFloat(product.selling_price) || 0; // MSRP
    const trendScore = categoryTrendScores[product.product_category] || 0;

    const dynamicPrice = getDynamicPrice(sellingPrice, trendScore, basePrice);
    const discountPercent = getDiscountPercent(sellingPrice, dynamicPrice);

    res.json({
      basePrice: sellingPrice.toFixed(2),   // crossed out price in UI
      finalPrice: dynamicPrice.toFixed(2),  // discounted price
      discountPercent,
    });
  } catch (err) {
    console.error('Error in /api/pricing:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
