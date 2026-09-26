import * as THREE
from "three";

export function createNeonWall(
  scene
) {

  const group =
    new THREE.Group();

  /*
    Dark backing wall
  */

  const wall =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        10,
        6,
        .4
      ),

      new THREE.MeshStandardMaterial({

        color:
          0x10131a,

        roughness:
          .75

      })

    );

  wall.position.y =
    3;

  group.add(wall);


  /*
    WULIN letters
  */

  const letters =
    createTextTexture(
      "WULIN",
      "#0d1118",
      "#ff4278"
    );

  const mainSign =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        7.5,
        1.8
      ),

      new THREE.MeshBasicMaterial({

        map:
          letters,

        transparent:
          true

      })

    );

  mainSign.position.set(
    0,
    4.2,
    -.22
  );

  group.add(mainSign);


  /*
    Neon symbols
  */

  const colors = [

    0xff3f74,
    0x2eeaff,
    0xffd343,
    0x5dff8b,
    0xc26aff

  ];

  for (
    let i = 0;
    i < 22;
    i++
  ) {

    const color =
      colors[
        i %
        colors.length
      ];

    const ring =
      new THREE.Mesh(

        new THREE.TorusGeometry(
          .13 +
          Math.random() *
          .18,

          .025,

          6,
          16
        ),

        new THREE.MeshBasicMaterial({
          color
        })

      );

    ring.position.set(

      -4.2 +
      Math.random() *
      8.4,

      .7 +
      Math.random() *
      2.5,

      -.25

    );

    group.add(ring);

  }


  /*
    Colored spill light
  */

  const pink =
    new THREE.PointLight(
      0xff246f,
      18,
      8,
      2
    );

  pink.position.set(
    -2,
    3,
    -2
  );

  group.add(pink);


  const blue =
    new THREE.PointLight(
      0x2bdcff,
      15,
      8,
      2
    );

  blue.position.set(
    2,
    2.5,
    -2
  );

  group.add(blue);


  /*
    Put the wall beside the market,
    not across the road.
  */

  group.position.set(
    -8.2,
    0,
    -54
  );

  group.rotation.y =
    Math.PI / 2;

  scene.add(group);

}

function createTextTexture(
  text,
  background,
  color
) {

  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width =
    1024;

  canvas.height =
    256;

  const ctx =
    canvas.getContext(
      "2d"
    );

  ctx.fillStyle =
    background;

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.shadowBlur =
    35;

  ctx.shadowColor =
    color;

  ctx.fillStyle =
    color;

  ctx.font =
    "bold 170px Arial";

  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "middle";

  ctx.fillText(
    text,
    512,
    135
  );

  const texture =
    new THREE.CanvasTexture(
      canvas
    );

  texture.colorSpace =
    THREE.SRGBColorSpace;

  return texture;

}
