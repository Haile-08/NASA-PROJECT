const http = require("http");
// HTTP is usefull for websockets for realtime communiection
// express is just a middelware the we use as in this example
// http allows us to respones to http request

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.models");

//COMMONLY react runs on port 3000 so the server needs to be differenet
const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://nasa-api:0oZd1rmTFLlEQeEk@nasa.og6hzhn.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

//load the csv data before the server.listen
async function startServer() {
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT} ...`);
  });
}

startServer();