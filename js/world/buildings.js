import * as THREE
from "three";

const wallColors = [

  0x34363c,
  0x292c31,
  0x393337,
  0x31333a,
  0x403836

];

export function createBuildings(
  scene
) {

  let index = 0;

  for (
    let z = 12;
    z > -125;
    z -= 10
  ) {

    createBuilding(
      scene,
      -10.5,
      z,
      "left",
      index
    );

    createBuilding(
      scene,
      10.5,
      z - 3,
      "right",
      index + 2
    );

    index++;

  }

}

function createBuilding(
  scene,
  x,
  z,
  side,
  index
) {

  const group =
    new THREE.Group();

  const height =
    7 +
    (index % 5) *
    1.2;

  const width =
    6 +
    (index % 3) *
    .5;

  const depth =
    9.5;

  const wall =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        width,
        height,
        depth
      ),

      new THREE.MeshStandardMaterial({

        color:
          wallColors[
            index %
            wallColors.length
          ],

        roughness:
          .9

      })

    );

  wall.position.y =
    height / 2;

  wall.castShadow =
    true;

  wall.receiveShadow =
    true;

  group.add(wall);


  const frontX =

    side === "left"

    ? width / 2 + .02

    : -width / 2 - .02;


  /*
    Window grid
  */

  for (
    let y = 3.8;
    y < height - .5;
    y += 1.7
  ) {

    for (
      let localZ = -3.5;
      localZ <= 3.5;
      localZ += 1.7
    ) {

      const lit =
        Math.random() >
        .55;

      const window =
        new THREE.Mesh(

          new THREE.PlaneGeometry(
            .8,
            .9
          ),

          new THREE.MeshStandardMaterial({

            color:
              lit
              ? 0xc08243
              : 0x10151d,

            emissive:
              lit
              ? 0xff812f
              : 0x000000,

            emissiveIntensity:
              lit
              ? .7
              : 0,

            roughness:
              .35

          })

        );

      window.position.set(
        frontX,
        y,
        localZ
      );

      window.rotation.y =

        side === "left"

        ? Math.PI / 2

        : -Math.PI / 2;

      group.add(window);

    }

  }


  /*
    AC units
  */

  for (
    let y = 4;
    y < height - 1;
    y += 3
  ) {

    const ac =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .42,
          .52,
          .78
        ),

        new THREE.MeshStandardMaterial({
          color: 0x898a84,
          roughness: .8
        })

      );

    ac.position.set(
      side === "left"
        ? width / 2 + .23
        : -width / 2 - .23,

      y,

      3
    );

    group.add(ac);

  }


  /*
    Drain pipe
  */

  const pipe =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        .055,
        .055,
        height * .85,
        8
      ),

      new THREE.MeshStandardMaterial({
        color: 0x202226
      })

    );

  pipe.position.set(
    side === "left"
      ? width / 2 + .15
      : -width / 2 - .15,

    height * .43,

    -3.7
  );

  group.add(pipe);


  /*
    Balcony
  */

  if (
    index % 3 === 0
  ) {

    const balcony =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .9,
          .12,
          3
        ),

        new THREE.MeshStandardMaterial({
          color: 0x17191c
        })

      );

    balcony.position.set(
      side === "left"
        ? width / 2 + .42
        : -width / 2 - .42,

      4,

      0
    );

    group.add(balcony);

  }

  group.position.set(
    x,
    0,
    z
  );

  scene.add(group);

}
