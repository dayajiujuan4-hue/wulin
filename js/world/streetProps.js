import * as THREE
from "three";

export function createStreetProps(
  scene
) {

  createBollards(scene);

  createPlanters(scene);

  createBins(scene);

  createBoxes(scene);

  createScooters(scene);

  createOverheadWires(scene);

}


/* BOLLARDS */

function createBollards(
  scene
) {

  for (
    let z = 8;
    z > -115;
    z -= 14
  ) {

    for (
      const x of [-5.1,5.1]
    ) {

      const bollard =
        new THREE.Mesh(

          new THREE.CylinderGeometry(
            .09,
            .11,
            .65,
            10
          ),

          new THREE.MeshStandardMaterial({

            color:
              0x30343a,

            metalness:
              .65,

            roughness:
              .35

          })

        );

      bollard.position.set(
        x,
        .325,
        z
      );

      scene.add(bollard);

    }

  }

}


/* PLANTERS */

function createPlanters(
  scene
) {

  for (
    const z of [
      4,
      -37,
      -79
    ]
  ) {

    const pot =
      new THREE.Mesh(

        new THREE.CylinderGeometry(
          .45,
          .35,
          .55,
          14
        ),

        new THREE.MeshStandardMaterial({
          color: 0x393b3d
        })

      );

    pot.position.set(
      -4.7,
      .28,
      z
    );

    scene.add(pot);


    for (
      let i = 0;
      i < 8;
      i++
    ) {

      const leaf =
        new THREE.Mesh(

          new THREE.SphereGeometry(
            .18,
            7,
            5
          ),

          new THREE.MeshStandardMaterial({
            color: 0x355b38
          })

        );

      leaf.scale.set(
        .7,
        1.6,
        .7
      );

      leaf.position.set(

        -4.7 +
        (Math.random()-.5) *
        .5,

        .7 +
        Math.random() *
        .5,

        z +
        (Math.random()-.5) *
        .5

      );

      scene.add(leaf);

    }

  }

}


/* BINS */

function createBins(
  scene
) {

  for (
    const z of [
      -8,
      -45,
      -91
    ]
  ) {

    const bin =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .5,
          .75,
          .45
        ),

        new THREE.MeshStandardMaterial({
          color: 0x30363a
        })

      );

    bin.position.set(
      4.8,
      .38,
      z
    );

    scene.add(bin);

  }

}


/* DELIVERY BOXES */

function createBoxes(
  scene
) {

  for (
    let i = 0;
    i < 14;
    i++
  ) {

    const box =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .45 +
          Math.random() *
          .35,

          .25 +
          Math.random() *
          .3,

          .45 +
          Math.random() *
          .3
        ),

        new THREE.MeshStandardMaterial({

          color:
            0x7a5b38,

          roughness:
            1

        })

      );

    box.position.set(

      i % 2
        ? -5
        : 5,

      .2,

      4 -
      i * 8

    );

    box.rotation.y =
      Math.random();

    scene.add(box);

  }

}


/* SCOOTERS */

function createScooters(
  scene
) {

  const positions = [

    [-4.7,-18],
    [4.7,-63],
    [-4.8,-102]

  ];

  positions.forEach(
    ([x,z],index) => {

      const scooter =
        new THREE.Group();

      const black =
        new THREE.MeshStandardMaterial({
          color: 0x101114
        });

      const bodyMat =
        new THREE.MeshStandardMaterial({

          color:
            index % 2
            ? 0x2e5d85
            : 0x9c2926,

          metalness:
            .2,

          roughness:
            .55

        });

      for (
        const zz of [-.52,.52]
      ) {

        const wheel =
          new THREE.Mesh(

            new THREE.TorusGeometry(
              .23,
              .055,
              8,
              18
            ),

            black

          );

        wheel.rotation.y =
          Math.PI / 2;

        wheel.position.set(
          0,
          .25,
          zz
        );

        scooter.add(wheel);

      }

      const body =
        new THREE.Mesh(

          new THREE.CapsuleGeometry(
            .17,
            .55,
            4,
            8
          ),

          bodyMat

        );

      body.rotation.x =
        Math.PI / 2;

      body.position.y =
        .48;

      scooter.add(body);


      const seat =
        new THREE.Mesh(

          new THREE.BoxGeometry(
            .34,
            .12,
            .5
          ),

          black

        );

      seat.position.set(
        0,
        .68,
        .08
      );

      scooter.add(seat);


      scooter.position.set(
        x,
        0,
        z
      );

      scooter.rotation.y =
        index % 2
        ? -.25
        : .3;

      scene.add(scooter);

    }
  );

}


/* WIRES */

function createOverheadWires(
  scene
) {

  for (
    let z = 8;
    z > -118;
    z -= 12
  ) {

    for (
      let i = 0;
      i < 2;
      i++
    ) {

      const points = [

        new THREE.Vector3(
          -10,
          6 + i * .25,
          z
        ),

        new THREE.Vector3(
          0,
          5.2 + i * .2,
          z - 1
        ),

        new THREE.Vector3(
          10,
          6.2 + i * .25,
          z - 2
        )

      ];

      const wire =
        new THREE.Line(

          new THREE.BufferGeometry()
            .setFromPoints(
              points
            ),

          new THREE.LineBasicMaterial({
            color: 0x08090b
          })

        );

      scene.add(wire);

    }

  }

}
