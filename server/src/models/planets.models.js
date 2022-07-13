const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");

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
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (err) => {
        rejects(err);
      })
      .on("end", () => {
        console.log(`${habitablePlanets.length} habitable planets found!`);
        reslove();
      });
  });
}

function getAllPlanets() {
  return habitablePlanets;
}
module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
