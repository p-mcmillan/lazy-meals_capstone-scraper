const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const scraperObjectSeafood = {
  url: "https://www.yourindependentgrocer.ca/deals/all?sort=relevance&category=27985&category=27999",

  async scraper(browser) {
    let page = await browser.newPage();

    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    // Wait for the required DOM to be rendered
    await page.waitForSelector(".product-tile__details");

    // Scroll to the bottom of the page to load more content
    await autoScroll(page);

    // Get the link/button to all the required categories
    let urls = await page.$$eval(".product-tile__details__info h3 a", (links) =>
      links.map((el) => el.href)
    );

    // Create an array to store the data objects
    let dataObjects = [];

    // Loop through each of those links, open a new page instance, and get the relevant data from them
    for (const url of urls) {
      let newPage = await browser.newPage();
      try {
        await newPage.goto(url);
        await newPage.waitForSelector(
          ".product-details-page-details__content__name"
        );

        // Add a random delay between 1 to 3 seconds
        await newPage.waitForTimeout(getRandomDelay(1000, 3000));
        let dataObj = {};

        // Generate a unique ID
        dataObj["id"] = uuidv4();

        dataObj["item_category"] = "fishSeafood";
        // Set the current date and time
        dataObj["date_scraped"] = new Date().toISOString();
        ////BRAND NAME////
        dataObj["item_brand"] = await newPage.$eval(
          ".product-name__item.product-name__item--brand",
          (element) => element.textContent.trim()
        );
        ///PRODUCT NAME///
        dataObj["item_name"] = await newPage.$eval(
          ".product-name__item.product-name__item--name",
          (element) => element.textContent.trim()
        );
        ////SALE PRICE////
        dataObj["item_sale_price"] = await newPage.evaluate(() => {
          const priceElement = document.querySelector(
            ".price__value.selling-price-list__item__price.selling-price-list__item__price--now-price__value"
          );
          if (priceElement) {
            const priceText = priceElement.textContent.trim().replace("$", "");
            return priceText;
          } else {
            return "No price";
          }
        });

        try {
          const expiryDateText = await newPage.$eval(
            ".text.text--small8.text--left.inherit.product-promo__message__expiry-date",
            (element) => element.textContent.trim()
          );
          ////ORIGINAL PRICE/////
          const originalPriceElement = await newPage.$(
            ".price__value.selling-price-list__item__price.selling-price-list__item__price--was-price__value"
          );
          if (originalPriceElement) {
            dataObj["item_original_price"] = await newPage.evaluate(
              (element) => {
                return element.textContent.trim().replace("$", "");
              },
              originalPriceElement
            );
          } else {
            dataObj["item_original_price"] = "null";
          }

          ///SALE END DATE////
          const dateRegex = /\d{4}-\d{2}-\d{2}/;
          const match = expiryDateText.match(dateRegex);
          dataObj["sale_Expiry_Date"] = match ? match[0] : "No expiry date";
        } catch (error) {
          dataObj["item_sale_expiry_date"] = "null";
        }
        ////PRODUCT IMAGE////
        dataObj["item_image"] = await newPage.$eval(
          ".responsive-image.responsive-image--product-details-page",
          (element) => element.getAttribute("src")
        );

        // Push the data object to the array
        console.log("dataObjects....", dataObjects);
        // console.log("dataObj....", dataObj);
        dataObjects.push(dataObj);
      } catch (error) {
        console.log(`Error scraping URL: ${url}. Skipping to the next URL.`);
        console.error(error);
      } finally {
        await newPage.close();
      }
      // // Add a random delay between 2 to 4 seconds before opening the next page
      await page.waitForTimeout(getRandomDelay(2000, 4000));
    }

    // Read the existing JSON file
    fs.readFile("data/yourindependentgrocer.json", "utf8", (err, data) => {
      if (err) {
        return console.log(err);
      }

      // Parse the JSON data into an object
      let existingDataObj = JSON.parse(data);

      // Merge the existing and new data objects
      let updatedDataObj = Object.assign(existingDataObj, dataObjects);

      // Convert the object to an array of objects
      let dataArray = Object.values(updatedDataObj);

      // Write the updated object back to the JSON file
      fs.writeFile(
        "data/yourindependentgrocer.json",
        JSON.stringify(dataArray, null, 2),
        "utf8",
        (err) => {
          if (err) {
            return console.log(err);
          }
          console.log("The data has been updated and saved successfully!");
        }
      );
    });
  },
};

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = scraperObjectSeafood;
