const launches = new Map();

const launch = {
  mission: "kepler exploration x",
  rocket: "explorer is1",
  launchDate: new Date("December 27, 2030"),
  destination: "kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

module.exports = {
  launches,
};
