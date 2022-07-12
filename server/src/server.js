const http = require("http");
// HTTP is usefull for websockets for realtime communiection
// express is just a middelware the we use as in this example
// http allows us to respones to http request

const app = require("./app");

//COMMONLY react runs on port 3000 so the server needs to be differenet
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});
