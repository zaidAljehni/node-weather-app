const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./util/mapbox");
const forecast = require("./util/weather-stack");

const app = express();

const port = process.env.PORT || 4000;

// Define paths for Express config
const publicDirectoryPath = path.join( __dirname, "../public" );
const viewsPath = path.join( __dirname, "../templates/views" );
const partialsPath = path.join( __dirname, "../templates/partials" );

app.set( "view engine", "hbs" );
app.set( "views", viewsPath );
hbs.registerPartials( partialsPath );


app.use( express.static( publicDirectoryPath ) );

// app.get( "/", ( request, response ) =>
// {
//     console.log( request );
//     response.send("Redirected to / Route");
// } );
// app.get( "/help", ( request, response ) =>
// {
//     console.log( request );
    
//     response.send("Redirected to /help Route");
// } );
// app.get( "/about", ( request, response ) =>
// {
//     console.log( request );
//     response.send("<h1>About Route</h1>");
// } );

app.get( "/", ( request, response ) =>
{
    response.render("index", {
        title: "Index Page",
        name: "James Wilson"
    });
} );
app.get( "/help", ( request, response ) =>
{
    response.render("help", {
        title: "Help Page",
        help: "bla bla bla",
        name: "James Wilson"
    });
} );
app.get( "/about", ( request, response ) =>
{
    response.render("about", {
        title: "About Page",
        name: "James Wilson"
    });
} );


app.get( "/weather", ( request, response ) =>
{
    let address = request.query.address;

    if( !address )
    {
        return response.send( {
            error: "Please provide an Address"
        } );
    }

    geocode( address, ( geocodeError, geocodeData ) =>
    {
        // console.log( `Data: ${data.location + "\t" + data.latitude + "\t" + data.longitude}` );
    
        if( geocodeError )
        {
            return response.send( { geocodeError } );
        }

        let forecaseRequestParameter = {
            latitude: geocodeData.latitude, 
            longitude: geocodeData.longitude
        };

        forecast( forecaseRequestParameter, ( forecastError, forecastData ) =>
        {
            // console.log( `Error: ${error}` );
            // console.log( "Data:" , data );

            if( forecastError )
            {
                return response.send( { forecastError } );
            }

            return response.send( { 
                location: geocodeData.location, 
                localtime: geocodeData.localtime, 
                temperature: forecastData.temperature, 
                feelslike: forecastData.feelslike,
                weather_description: forecastData.weather_description 
            } );
        });
    });
} );


app.get( "/help/*", ( request, response ) =>
{
    response.render( "error", {
        errorMessage: "Help Article NOT Found",
        name: "James Wilson"
    });
});

app.get( "/*", ( request, response ) =>
{
    response.render( "error", {
        errorMessage: "Page NOT Found",
        name: "James Wilson"
    });
});


app.listen( port, () =>
{
    console.log( "Hello Express!" );
} );
