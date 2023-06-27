// import seed data files, arrays of objects
const usersData = require("../seed-data/user_signup");

exports.seed = function (knex) {
  return knex("user")
    .del()
    .then(function () {
      return knex("user").insert(usersData);
    })
    .catch(function (error) {
      console.error("Error executing seed:", error.message);
    });
};
