//Variables a utilizar
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 8000;

const index = require("./index");
const app = express();
app.use(index);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`));

const io = socketIo(server); 
let selectedCity = "";

let interval;
io.on("connection", socket => {
        console.log("Client connected");
    if (interval) {
        clearInterval(interval);
    }
    
    interval = setInterval(() => gettingApiAndEmitting(socket), 20000);
        
    socket.on("getData", (city)=>{
            selectedCity = city
            gettingApiAndEmitting( socket );
        })
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

// io.on("connection", socket => {
//     console.log("Client connected");
//     socket.on("disconnect", () => {
//         console.log("Client disconnected");
//     });
//     socket.on("getData", (city)=>{
//             selectedCity = city
//             gettingApiAndEmitting( socket );
//     })
// });

let mLocationMap = new Map();
    mLocationMap.set('CL' , "-33.448891,-70.669266")
    mLocationMap.set("CH" , "47.376888,8.541694")
    mLocationMap.set("NZ" , "-36.848461,174.763336")
    mLocationMap.set("AU" , "-33.868820,151.209290")
    mLocationMap.set("UK" , "51.507351,-0.127758")
    mLocationMap.set("USA" , "32.165623,-82.900078")

function getFinalUrl(){
    return `https://api.darksky.net/forecast/e48b8170b9af70cf73b4fbee6fe10158/${mLocationMap.get(selectedCity)}`;
}


const gettingApiAndEmitting = async socket => {

    if( selectedCity !== ""){
        console.log(getFinalUrl())

        try{
            axios.get( getFinalUrl() )
            .then(function (res) {
                console.log('This is a GET: ' + res);
                console.log("data: "+ JSON.stringify(res.data.currently))
                socket.emit('FromAPI', res.data.currently )
            })
            .catch(function (error) {
                console.log('This is a Catch: ' + error);
                socket.emit('FromAPI', "" )  
            })

        }catch(error) {
            console.error(`This is a error: ' + ${error.code}`);
        }
    }

}
