import path from 'path';
import fs from 'fs/promises';
import googleTrends from 'google-trends-api';
import { readJSON } from '../utils/fileUtils.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INVENTORY_JSON = path.join(__dirname, '../inventory.json');
const TREND_SCORES_JSON = path.join(__dirname, './trendScores.json');

let categoryTrendScores = {};

// Load trend scores from JSON file at startup
export async function loadTrendScoresFromFile() {
  try {
    categoryTrendScores = await readJSON(TREND_SCORES_JSON);
    console.log('Loaded trend scores from file:', categoryTrendScores);
  } catch (e) {
    console.error('Error loading trend scores:', e);
    categoryTrendScores = {};
  }
}

// Save trend scores to JSON file after updating
async function saveTrendScoresToFile() {
  try {
    await fs.writeFile(
      TREND_SCORES_JSON,
      JSON.stringify(categoryTrendScores, null, 2)
    );
    console.log('Trend scores saved to file.');
  } catch (e) {
    console.error('Error saving trend scores:', e);
  }
}

// Fetch the Google Trends score for a keyword
export async function fetchTrendScore(keyword) {
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

// Update all category trend scores and save to file
export async function updateCategoryTrends() {
  try {
    const inventory = await readJSON(INVENTORY_JSON);
    const categories = [...new Set(inventory.map((item) => item.product_category))];
    for (const cat of categories) {
      const score = await fetchTrendScore(cat);
      categoryTrendScores[cat] = score;
    }
    console.log('Updated Google Trends scores:', categoryTrendScores);
    await saveTrendScoresToFile();
  } catch (e) {
    console.error('Error updating trends:', e);
  }
}

// Pricing helpers
export function getDynamicPriceAlt(sellingPrice, trendScore, basePrice = 0) {
  const maxDiscountPercent = 0.20;
  const factor = trendScore / 100;
  const trendDiscount = maxDiscountPercent * factor;
  const minDiscount = 0.01;
  const effectiveDiscount = Math.max(minDiscount, trendDiscount);

  let dynamicPrice = sellingPrice * (1 - effectiveDiscount);
  dynamicPrice = Math.max(basePrice, dynamicPrice);  // Ensure not below base
  dynamicPrice = Math.min(sellingPrice, dynamicPrice); // Ensure not above original

  return parseFloat(dynamicPrice.toFixed(2));
}

export function getDiscountPercent(sellingPrice, dynamicPrice) {
  if (!sellingPrice || !dynamicPrice || dynamicPrice >= sellingPrice) return 0;
  return Math.round(((sellingPrice - dynamicPrice) / sellingPrice) * 100);
}

// Export the current in-memory scores for use in your app
export { categoryTrendScores };

export { getDynamicPriceAlt as getDynamicPrice }; 

// ---- On startup, load the scores from file ----
await loadTrendScoresFromFile();
