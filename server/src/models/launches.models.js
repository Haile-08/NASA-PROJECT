const launchesDatabase = require("./launches.mongo");
const planetdb = require('./planets.mongo')

const defaultflightnumber = 100;

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "kepler exploration x",
  rocket: "explorer is1",
  launchDate: new Date("December 27, 2030"),
  target: "kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

saveLaunch(launch)

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

async function getlatestflightnumber(){
  const latestlaunch = await launchesDatabase.find().sort('-flightNumber');
  if(!latestlaunch){
     return defaultflightnumber
  }
  return latestlaunch.flightNumber;
}
async function getAllLaunches() {
  return await launchesDatabase.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function saveLaunch(launch){
   const palnet = await planetdb.find({
         keplerName: launch.target,
   });

   if(!palnet){
    //node error handling method
    throw new Error('no matching planet found')
   }

   await launchesDatabase.updateOne({
    flightNumber: launch.flightNumber,

   }, launch , {
    upsert:true
   })
}
function addNewLaunche(launch) {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customers: ["zero to master", "nasa"],
      flightNumber: latestFlightNumber,
    })
  );
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}
module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunche,
  abortLaunchById,
};
