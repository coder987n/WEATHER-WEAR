var ajax = require('ajax');
var UI = require('ui');

//Create a Card with title and subtitle
var card = new UI.Card({
  title:'WeatherWear',
  subtitle:'Fetching... ',
  titleColor: 'blue',
  subtitleColor: '#9a0036',
  bodyColor: 'green',
  titleAlign: 'center',
  subtitleAlign: 'center',
  backgroundColor: 'green'
});

// Display the Card
card.show();

//Construct URL
var cityName = 'Bellevue';
var URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName+ '&appid=' + 'b20ba254c3e20613a10c11b5ab21b567';

ajax(
 {
   url: URL,
   type: 'json'
 },
 function(data) {
    //Success!
    console.log('Successfully fetched weather data!');
    //Extract data
    var location = data.name;
    var temperature = Math.round(data.main.temp * 1.8 - 459.67);
    var temperature2 = Math.round(data.main.temp - 273.15);
      
    //Always upper-case first letter of description
    var description = data.weather[0].description;
    description = description.charAt(0).toUpperCase() + description.substring(1);
    
    //Show to user
    if (temperature > 60 && temperature < 70) {
      card.body("You should wear a light jacket.");
      
    } else if (temperature < 60 && temperature > 50) {
      card.body("You should wear a jacket and jeans.");
      
    } else if (temperature < 50 ) {
      card.body("You should wear a heavy jacket, pack yourself completely.");
      
    } else if (temperature > 70) {
      card.body("You should wear a t-shirt and shorts.");
      
    } else {
      card.body("ERROR");
      
    }
    card.subtitle(location + ', ' + temperature + 'F' + ', ' + temperature2 + 'C');
  },
  function(error) {
    //Failure!
    console.log('Failed fetching weather data: ' + error);
  }
);


