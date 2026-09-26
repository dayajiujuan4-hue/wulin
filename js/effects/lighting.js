import * as THREE
from "three";

export function createLighting(
  scene
) {

  const hemisphere =
    new THREE.HemisphereLight(

      0x48628a,

      0x1b1415,

      1.25

    );

  scene.add(
    hemisphere
  );


  /*
    Blue city night
  */

  const moon =
    new THREE.DirectionalLight(

      0x91a9db,

      1.4

    );

  moon.position.set(
    -18,
    28,
    20
  );

  moon.castShadow =
    true;

  moon.shadow.mapSize.set(
    2048,
    2048
  );

  moon.shadow.camera.left =
    -35;

  moon.shadow.camera.right =
    35;

  moon.shadow.camera.top =
    40;

  moon.shadow.camera.bottom =
    -40;

  scene.add(moon);


  /*
    Entrance commercial light
  */

  const entrance =
    new THREE.PointLight(

      0xffa45c,

      16,

      14,

      2

    );

  entrance.position.set(
    0,
    4,
    12
  );

  scene.add(
    entrance
  );

}
