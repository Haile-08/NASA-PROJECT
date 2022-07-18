const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

const planets = require("./planets.mongo");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
/* 
    //  a way to reslove the data before sending

const promise = new promise((resolve, reject) => {
    resolve(42);
});

//
promise.then((result) =>{

});

//then wait for the result
const result = await promise;
//log it
console.log(result);

*/

function loadPlanetsData() {
  return new Promise((reslove, rejects) => {
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "data.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          //insert + update = upsert
          // await planets.create({
          //   keplerName: data.kepler_name,
          // });
          savePlanet(data);
        }
      })
      .on("error", (err) => {
        rejects(err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        reslove();
      });
  });
}

async function getAllPlanets() {
  return await planets.find(
    {},
    {
      // to exlxude
      _id: 0,
      __v: 0,
    }
  );
}

async function savePlanet(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log(`can not scave planet ${err}`);
  }
}
module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
