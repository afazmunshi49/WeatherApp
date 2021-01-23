const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

// This will initialize the new express app.
const app = express();

// Let the app use bodyParser
app.use(bodyParser.urlencoded({extended: true}));

// Remenber you can use the send method only once in any .get() method.
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");

  //res.send("The server is up.");
});

app.post("/", function (req, res) {
  const appKey = "e0e3b7af100698a599957d6283890ed0";
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" +appKey + "&units=metric";

  https.get(url, function (response) {
    response.on("data", (data)=>{
      const weatherData = JSON.parse(data);
      const weatherDescription = weatherData.weather[0].description;
      const tempreture = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";

      // Now send all the data.
      res.write("<p>" + weatherDescription + "</p>");
      res.write("<h1>The tempreture in " + query + " is " + tempreture + " degrees Celcius.</h1>");
      res.write("<img src =" + imageURL+ ">");
      res.send();
    });
  });
});



app.listen(3000, function () {
  console.log("The server is running on port 3000");
});
