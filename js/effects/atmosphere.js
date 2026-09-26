import * as THREE
from "three";

let floatingDust;

export function createAtmosphere(
  scene
) {

  const count =
    220;

  const positions =
    new Float32Array(
      count * 3
    );

  for (
    let i = 0;
    i < count;
    i++
  ) {

    positions[
      i * 3
    ] =
      -6 +
      Math.random() *
      12;

    positions[
      i * 3 + 1
    ] =
      .5 +
      Math.random() *
      5;

    positions[
      i * 3 + 2
    ] =
      15 -
      Math.random() *
      140;

  }

  const geometry =
    new THREE.BufferGeometry();

  geometry.setAttribute(

    "position",

    new THREE.BufferAttribute(
      positions,
      3
    )

  );

  const material =
    new THREE.PointsMaterial({

      color:
        0xffd8a0,

      size:
        .025,

      transparent:
        true,

      opacity:
        .2,

      depthWrite:
        false

    });

  floatingDust =
    new THREE.Points(
      geometry,
      material
    );

  scene.add(
    floatingDust
  );

}

export function updateAtmosphere(
  time
) {

  if (
    !floatingDust
  ) return;

  floatingDust.rotation.y =
    Math.sin(
      time * .05
    ) *
    .003;

}
