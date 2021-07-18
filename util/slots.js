const axios = require("axios");
const table = require("tty-table");
const chalk = require("chalk");
const { config, options } = require("./config");
const inquirer = require("inquirer");
const notifier = require("node-notifier");

var currdate = new Date();
var dd = String(currdate.getDate()).padStart(2, "0");
var mm = String(currdate.getMonth() + 1).padStart(2, "0"); 
var yyyy = currdate.getFullYear();
currdate = dd + "-" + mm + "-" + yyyy;

module.exports = function (districtid) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Please choose age group",
        choices: [
          {
            name: "All ages",
            value: "",
          },
          {
            name: "45+",
            value: "45",
          },
          {
            name: "18-45",
            value: "18",
          },
        ],
      },
    ])
    .then((answers) => {
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtid}&date=${currdate}`,
          config
        )
        .then(function (response) {
          let header = [
            {
              value: "center",
              headerColor: "cyan",
              color: "white",
              align: "left",
              alias: "Center Name",
              width: 40,
            },
            {
              value: "address",
              color: "red",
              alias: "Center Address",
              width: 40,
            },
            {
              value: "available",
              color: "red",
              alias: "Available",
              width: 20,
            },
            {
              value: "age",
              color: "red",
              alias: "Min age",
              width: 10,
            },
            {
              value: "date",
              color: "red",
              alias: "Date",
              width: 20,
            },
          ];

          var finalData = [];

          response.data.sessions.forEach((item) => {
            if (answers.choice == "") {
              let OurData = {
                center: item.name,
                address: item.address,
                available: item.available_capacity,
                age: item.min_age_limit,
                date: item.date,
              };
              finalData.push(OurData);
            } else if (answers.choice == item.min_age_limit) {
              let OurData = {
                center: item.name,
                address: item.address,
                available: item.available_capacity,
                age: item.min_age_limit,
                date: item.date,
              };
              finalData.push(OurData);
            }
          });

          const out = table(header, finalData, options).render();
          console.log(out);
          notifier.notify({
              title:"Cowin slots executed",
              subtitle:"subtitle",
              message:"Cowin slots executed",
              wait:true,
          })
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};
