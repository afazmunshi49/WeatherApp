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

// const url = "https://api.openweathermap.org/data/2.5/weather?q=Winnipeg&appid=e0e3b7af100698a599957d6283890ed0&units=metric";
// https.get(url, function (response){
//
//   // Statuscode 200 measn everything is fine.
//   console.log(response.statusCode);
//
//   // .on(data, callback(data)) means that on recieving a data from somewhere, do something using the callback function.
//   // Here, remember that the data we will recieve will be in hexadecimal format.
//   response.on("data", (data)=>{
//     //console.log(data);
//   });
//
//   /*Notice that the data we get back is in hexadecimal format and hence we need to parse
//   the data in JSON format and hence we will use the .parse() method.
//   This will make the data more readable.
//   */
//   response.on("data", (data)=>{
//     const WeatherData = JSON.parse(data);
//     console.log("Name of the city is: " + WeatherData.name);
//     //console.log("The tempreture of that city is: " + WeatherData.main.temp + "C");
//     //console.log("description: " + WeatherData.weather[0].description);
//
//     const weatherDescription = WeatherData.weather[0].description;
//     const temp = WeatherData.main.temp;
//     const icon = WeatherData.weather[0].icon;
//     const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
//     res.write("<p>The weather description is " + weatherDescription + "<p>");
//     res.write("<h1>The tempreture in Winnipeg is " + temp + " degree Celcius</h1>");
//     res.write("<img src="+ imageURL + ">");
//     console.log("ICON: " + icon);
//     res.send();
//   });
//
// });

app.listen(3000, function () {
  console.log("The server is running on port 3000");
});
