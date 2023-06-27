// // import seed data files, arrays of objects
// const yourIndependentGrocerDavieData = require("../seed-data/yourindependentgrocer");

// exports.seed = function (knex) {
//   return knex("foodsales")
//     .del()
//     .then(function () {
//       return knex("foodsales").insert(yourIndependentGrocerDavieData);
//     });
// };

// import seed data files, arrays of objects
const yourIndependentGrocerDavieData = require("../seed-data/yourindependentgrocer");

exports.seed = function (knex) {
  return knex("foodsales")
    .del()
    .then(function () {
      const seedData = yourIndependentGrocerDavieData.map(
        (yourIndependentGrocerDavieData) => {
          const {
            date_scraped,
            item_brand,
            item_category,
            item_image,
            item_name,
            item_sale_expiry_date,
            item_sale_price,
            item_original_price,
          } = yourIndependentGrocerDavieData;
          return {
            date_scraped: formatDate(date_scraped),
            item_brand: item_brand || "DEFAULT",
            item_category: item_category || "DEFAULT",
            item_image: item_image || "DEFAULT",
            item_name: item_name || "DEFAULT",
            item_sale_expiry_date: item_sale_expiry_date || "DEFAULT",
            item_sale_price: item_sale_price || "DEFAULT",
            item_original_price: item_original_price || "DEFAULT",
          };
        }
      );

      return knex("foodsales").insert(seedData);
    });
};

// Function to format date
function formatDate(date) {
  if (!date) {
    return "DEFAULT";
  }

  if (typeof date === "string") {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      throw new Error(`Invalid date format: ${date}`);
    }
    return parsedDate.toISOString();
  }

  if (date instanceof Date) {
    if (isNaN(date)) {
      throw new Error(`Invalid date format: ${date}`);
    }
    return date.toISOString();
  }

  throw new Error(`Invalid date value: ${date}`);
}
