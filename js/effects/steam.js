import * as THREE
from "three";

const steamGroups = [];

export function createSteam(
  scene,
  x,
  z
) {

  const group =
    new THREE.Group();

  for (
    let i = 0;
    i < 8;
    i++
  ) {

    const particle =
      new THREE.Mesh(

        new THREE.SphereGeometry(
          .12 +
          Math.random() *
          .12,
          7,
          5
        ),

        new THREE.MeshBasicMaterial({

          color:
            0xdde2e6,

          transparent:
            true,

          opacity:
            .06,

          depthWrite:
            false

        })

      );

    particle.position.set(

      (Math.random()-.5) *
      .5,

      1 +
      Math.random() *
      1.2,

      (Math.random()-.5) *
      .5

    );

    particle.userData = {

      startY:
        particle.position.y,

      speed:
        .25 +
        Math.random() *
        .25,

      phase:
        Math.random() *
        Math.PI *
        2

    };

    group.add(
      particle
    );

  }

  group.position.set(
    x,
    0,
    z
  );

  scene.add(
    group
  );

  steamGroups.push(
    group
  );

}

export function updateSteam(
  delta,
  time
) {

  steamGroups.forEach(
    group => {

      group.children.forEach(
        particle => {

          particle.position.y +=

            particle.userData.speed *
            delta;

          particle.position.x +=

            Math.sin(
              time * .8 +
              particle.userData.phase
            )

            * delta *
            .025;

          particle.scale.setScalar(

            1 +
            (
              particle.position.y -
              particle.userData.startY
            )

            * .25

          );

          particle.material.opacity =

            Math.max(

              0,

              .08 -
              (
                particle.position.y -
                particle.userData.startY
              )

              * .018

            );

          if (
            particle.position.y >
            particle.userData.startY +
            2.5
          ) {

            particle.position.y =
              particle.userData.startY;

            particle.material.opacity =
              .08;

          }

        }
      );

    }
  );

}
