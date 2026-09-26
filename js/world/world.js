import {
  createStreet
} from "./street.js";

import {
  createBuildings
} from "./buildings.js";

import {
  createShops
} from "./shops.js";

import {
  createStalls
} from "./stalls.js";

import {
  createNeonWall
} from "./neonWall.js";

import {
  createStreetProps
} from "./streetProps.js";

import {
  createLighting
} from "../effects/lighting.js";

import {
  createAtmosphere,
  updateAtmosphere
} from "../effects/atmosphere.js";

import {
  updateSteam
} from "../effects/steam.js";

export function createWorld(
  scene
) {

  createLighting(scene);

  createStreet(scene);

  createBuildings(scene);

  createShops(scene);

  createStalls(scene);

  createNeonWall(scene);

  createStreetProps(scene);

  createAtmosphere(scene);

}

export function updateWorld(
  delta,
  time
) {

  updateSteam(
    delta,
    time
  );

  updateAtmosphere(
    time
  );

}
