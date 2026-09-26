import * as THREE
from "three";

export function createStreet(
  scene
) {

  const base =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        38,
        165
      ),

      new THREE.MeshStandardMaterial({

        color:
          0x24252a,

        roughness:
          .78,

        metalness:
          .08

      })

    );

  base.rotation.x =
    -Math.PI / 2;

  base.position.set(
    0,
    0,
    -55
  );

  base.receiveShadow =
    true;

  scene.add(base);


  /*
    武林路の歩行エリア
  */

  const walkway =
    new THREE.Group();

  const tileMaterials = [

    0x343439,
    0x303136,
    0x39383b,
    0x2d2e32

  ];

  const tileWidth =
    1.4;

  const tileLength =
    1.5;

  for (
    let z = 18;
    z > -126;
    z -= tileLength
  ) {

    for (
      let x = -4.9;
      x <= 4.9;
      x += tileWidth
    ) {

      const tile =
        new THREE.Mesh(

          new THREE.PlaneGeometry(
            tileWidth - .025,
            tileLength - .025
          ),

          new THREE.MeshStandardMaterial({

            color:
              tileMaterials[
                Math.floor(
                  Math.random() *
                  tileMaterials.length
                )
              ],

            roughness:
              .62,

            metalness:
              .12

          })

        );

      tile.rotation.x =
        -Math.PI / 2;

      tile.position.set(
        x,
        .012,
        z
      );

      tile.receiveShadow =
        true;

      walkway.add(tile);

    }

  }

  scene.add(walkway);


  /*
    Wet patches
  */

  for (
    let i = 0;
    i < 24;
    i++
  ) {

    const wet =
      new THREE.Mesh(

        new THREE.CircleGeometry(
          .4 +
          Math.random() *
          1.2,

          18
        ),

        new THREE.MeshStandardMaterial({

          color:
            0x15191f,

          roughness:
            .18,

          metalness:
            .42,

          transparent:
            true,

          opacity:
            .55

        })

      );

    wet.rotation.x =
      -Math.PI / 2;

    wet.scale.x =
      .5 +
      Math.random() *
      1.8;

    wet.position.set(

      -3.5 +
      Math.random() *
      7,

      .025,

      10 -
      Math.random() *
      125

    );

    scene.add(wet);

  }


  /*
    Drainage
  */

  for (
    const x of [-5.2,5.2]
  ) {

    const drain =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .18,
          .035,
          145
        ),

        new THREE.MeshStandardMaterial({

          color:
            0x111215,

          metalness:
            .65,

          roughness:
            .35

        })

      );

    drain.position.set(
      x,
      .025,
      -54
    );

    scene.add(drain);

  }


  /*
    Manholes
  */

  for (
    const z of [-12,-48,-87]
  ) {

    const manhole =
      new THREE.Mesh(

        new THREE.CylinderGeometry(
          .45,
          .45,
          .035,
          24
        ),

        new THREE.MeshStandardMaterial({

          color:
            0x26282a,

          metalness:
            .65,

          roughness:
            .55

        })

      );

    manhole.position.set(
      z === -48
        ? 1.8
        : -1.5,

      .035,

      z
    );

    scene.add(manhole);

  }

}
