import * as THREE
from "three";

import {
  CONFIG
} from "./config.js";

export function createPlayer(
  camera,
  element
) {

  camera.position.set(
    0,
    CONFIG.player.height,
    19
  );

  const keys = {};

  let yaw = 0;

  let pitch = 0;

  let walkTime = 0;

  document.addEventListener(
    "keydown",
    e => {

      keys[
        e.key.toLowerCase()
      ] = true;

    }
  );

  document.addEventListener(
    "keyup",
    e => {

      keys[
        e.key.toLowerCase()
      ] = false;

    }
  );

  document.addEventListener(
    "mousemove",
    e => {

      if (
        document.pointerLockElement !==
        element
      ) return;

      yaw -=
        e.movementX *
        .002;

      pitch -=
        e.movementY *
        .002;

      pitch =
        THREE.MathUtils.clamp(
          pitch,
          -1.35,
          1.35
        );

    }
  );

  const forward =
    new THREE.Vector3();

  const right =
    new THREE.Vector3();

  function update(
    delta
  ) {

    camera.rotation.order =
      "YXZ";

    camera.rotation.y =
      yaw;

    camera.rotation.x =
      pitch;

    camera.getWorldDirection(
      forward
    );

    forward.y = 0;

    forward.normalize();

    right.set(
      forward.z,
      0,
      -forward.x
    );

    const speed =

      keys["shift"]

      ? CONFIG.player.runSpeed

      : CONFIG.player.speed;

    let moving =
      false;

    if (keys["w"]) {

      camera.position
        .addScaledVector(
          forward,
          speed * delta
        );

      moving = true;
    }

    if (keys["s"]) {

      camera.position
        .addScaledVector(
          forward,
          -speed * delta
        );

      moving = true;
    }

    if (keys["a"]) {

      camera.position
        .addScaledVector(
          right,
          -speed * delta
        );

      moving = true;
    }

    if (keys["d"]) {

      camera.position
        .addScaledVector(
          right,
          speed * delta
        );

      moving = true;
    }

    if (moving) {

      walkTime +=
        delta *
        (keys["shift"] ? 11 : 8);

      camera.position.y =
        CONFIG.player.height +
        Math.sin(
          walkTime
        ) *
        .022;

    } else {

      camera.position.y +=

        (
          CONFIG.player.height -
          camera.position.y
        )

        * .15;

    }

    camera.position.x =
      THREE.MathUtils.clamp(
        camera.position.x,
        -4.7,
        4.7
      );

    camera.position.z =
      THREE.MathUtils.clamp(
        camera.position.z,
        -123,
        20
      );

  }

  return {
    update
  };

}
