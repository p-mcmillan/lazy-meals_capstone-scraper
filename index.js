const browserObject = require("./browsers/independentBrowser");
const scraperController = require("./controllers/pageController");
const pageScraper = require("./scraper/independentPageScraper");
const seafoodScraper = require("./scraper/seafoodPageScraper");
const fruitVegatablesScraper = require("./scraper/fruitsVegetablePageScraper");
const deliScraper = require("./scraper/deliPageScraper");
const bakeryScraper = require("./scraper/bakeryPageScraper");
const dairyEggsScraper = require("./scraper/dairyEggsPageScraper");
const drinksScraper = require("./scraper/drinksPageScraper");
const frozenScraper = require("./scraper/frozenPageScraper");
const pantryScraper = require("./scraper/pantryPageScraper");
const naturalFoodsScraper = require("./scraper/naturalFoodsPageScraper");
const snacksChipsCandyScraper = require("./scraper/snacksChipsCandyScraper");
const internationalFoodsScraper = require("./scraper/internationalFoodsPageScraper");
const kiwi = require("./scraper/josh");

console.log("pageScraper: ", pageScraper);
console.log("seaFoodScraper: ", seafoodScraper);
console.log("fruit: ", fruitVegatablesScraper);
console.log("deli: ", deliScraper);
console.log("bakery: ", bakeryScraper);
console.log("dary: ", dairyEggsScraper);
console.log("drinks: ", drinksScraper);
console.log("frozen: ", frozenScraper);
console.log("pantry: ", pantryScraper);
console.log("naturalFoods: ", naturalFoodsScraper);
console.log("snacksChipsCandy: ", snacksChipsCandyScraper);
console.log("internationalFoods: ", internationalFoodsScraper);

(async () => {
  let browserInstance = await browserObject.startBrowser();
  await scraperController(browserInstance, pageScraper);
  await scraperController(browserInstance, seafoodScraper);
  await scraperController(browserInstance, fruitVegatablesScraper);
  await scraperController(browserInstance, deliScraper);
  await scraperController(browserInstance, bakeryScraper);
  await scraperController(browserInstance, dairyEggsScraper);
  await scraperController(browserInstance, drinksScraper);
  await scraperController(browserInstance, frozenScraper);
  await scraperController(browserInstance, pantryScraper);
  await scraperController(browserInstance, naturalFoodsScraper);
  await scraperController(browserInstance, snacksChipsCandyScraper);
  await scraperController(browserInstance, internationalFoodsScraper);
  await browserInstance.close();
})();