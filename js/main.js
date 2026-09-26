import * as THREE from "three";

import {
  createWorld,
  updateWorld
} from "./world/world.js";

import {
  createPlayer
} from "./player.js";

const scene =
  new THREE.Scene();

scene.background =
  new THREE.Color(
    0x07101e
  );

scene.fog =
  new THREE.FogExp2(
    0x07101e,
    .012
  );

const camera =
  new THREE.PerspectiveCamera(

    67,

    innerWidth /
    innerHeight,

    .1,

    250

  );

const renderer =
  new THREE.WebGLRenderer({

    antialias: true,

    powerPreference:
      "high-performance"

  });

renderer.setSize(
  innerWidth,
  innerHeight
);

renderer.setPixelRatio(

  Math.min(
    devicePixelRatio,
    2
  )

);

renderer.shadowMap.enabled =
  true;

renderer.shadowMap.type =
  THREE.PCFSoftShadowMap;

renderer.outputColorSpace =
  THREE.SRGBColorSpace;

renderer.toneMapping =
  THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
  1.15;

document.body.appendChild(
  renderer.domElement
);

/* WORLD */

const loadingBar =
  document.querySelector(
    "#loadingBar"
  );

loadingBar.style.width =
  "25%";

createWorld(scene);

loadingBar.style.width =
  "80%";

/* PLAYER */

const player =
  createPlayer(
    camera,
    renderer.domElement
  );

loadingBar.style.width =
  "100%";

/* LOADING */

setTimeout(
  () => {

    const loading =
      document.querySelector(
        "#loading"
      );

    loading.style.opacity =
      0;

    setTimeout(
      () => {

        loading.style.display =
          "none";

        document
          .querySelector(
            "#startScreen"
          )
          .style.display =
          "flex";

      },

      900
    );

  },

  700
);

/* POINTER LOCK */

const start =
  document.querySelector(
    "#startScreen"
  );

document
  .querySelector(
    "#startButton"
  )
  .onclick =
  () => {

    renderer
      .domElement
      .requestPointerLock();

  };

renderer
  .domElement
  .addEventListener(
    "click",
    () => {

      if (
        document.pointerLockElement !==
        renderer.domElement
      ) {

        renderer
          .domElement
          .requestPointerLock();

      }

    }
  );

document.addEventListener(
  "pointerlockchange",
  () => {

    start.style.display =

      document.pointerLockElement ===
      renderer.domElement

      ? "none"

      : "flex";

  }
);

/* LOCATION */

const zone =
  document.querySelector(
    "#zone"
  );

function updateZone() {

  const z =
    camera.position.z;

  if (z > 8)

    zone.textContent =
      "武林路入口";

  else if (z > -25)

    zone.textContent =
      "夜市北段";

  else if (z > -55)

    zone.textContent =
      "小吃・文創エリア";

  else if (z > -85)

    zone.textContent =
      "武林夜市中央";

  else

    zone.textContent =
      "夜市南段";

}

/* RESIZE */

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      innerWidth /
      innerHeight;

    camera
      .updateProjectionMatrix();

    renderer.setSize(
      innerWidth,
      innerHeight
    );

  }
);

/* LOOP */

const clock =
  new THREE.Clock();

function animate() {

  requestAnimationFrame(
    animate
  );

  const delta =
    Math.min(
      clock.getDelta(),
      .05
    );

  const time =
    clock.elapsedTime;

  player.update(
    delta
  );

  updateWorld(
    delta,
    time
  );

  updateZone();

  renderer.render(
    scene,
    camera
  );

}

animate();
