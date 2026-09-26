import * as THREE
from "three";

const shopNames = [

  "武林小铺",
  "杭州文创",
  "茶饮",
  "潮流集合店",
  "生活馆",
  "咖啡",
  "小吃",
  "饰品"

];

export function createShops(
  scene
) {

  let index = 0;

  for (
    let z = 12;
    z > -120;
    z -= 10
  ) {

    createShop(
      scene,
      -7.55,
      z,
      "left",
      shopNames[
        index %
        shopNames.length
      ]
    );

    createShop(
      scene,
      7.55,
      z - 3,
      "right",
      shopNames[
        (index + 3) %
        shopNames.length
      ]
    );

    index++;

  }

}

function createShop(
  scene,
  x,
  z,
  side,
  name
) {

  const group =
    new THREE.Group();

  const interior =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        1.8,
        2.7,
        5.2
      ),

      new THREE.MeshStandardMaterial({

        color:
          0x38251a,

        emissive:
          0x5a2a0d,

        emissiveIntensity:
          .5

      })

    );

  interior.position.y =
    1.35;

  group.add(interior);


  /*
    Glass front
  */

  const glass =
    new THREE.Mesh(

      new THREE.PlaneGeometry(
        4.6,
        2.5
      ),

      new THREE.MeshPhysicalMaterial({

        color:
          0x91a4b2,

        transparent:
          true,

        opacity:
          .18,

        roughness:
          .15,

        metalness:
          .05

      })

    );

  glass.position.set(
    side === "left"
      ? .92
      : -.92,

    1.35,

    0
  );

  glass.rotation.y =
    side === "left"
      ? Math.PI / 2
      : -Math.PI / 2;

  group.add(glass);


  /*
    Shelves
  */

  for (
    let shelfZ = -1.5;
    shelfZ <= 1.5;
    shelfZ += 1.5
  ) {

    const shelf =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .8,
          .08,
          1
        ),

        new THREE.MeshStandardMaterial({
          color: 0x7a5636
        })

      );

    shelf.position.set(
      0,
      1.2,
      shelfZ
    );

    group.add(shelf);

  }


  /*
    Sign
  */

  const sign =
    makeSign(name);

  sign.position.set(
    side === "left"
      ? 1.01
      : -1.01,

    2.85,

    0
  );

  sign.rotation.y =
    side === "left"
      ? Math.PI / 2
      : -Math.PI / 2;

  group.add(sign);


  const light =
    new THREE.PointLight(
      0xffa453,
      6,
      4,
      2
    );

  light.position.set(
    side === "left"
      ? .4
      : -.4,

    2.1,

    0
  );

  group.add(light);

  group.position.set(
    x,
    0,
    z
  );

  scene.add(group);

}

function makeSign(
  text
) {

  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width =
    512;

  canvas.height =
    128;

  const ctx =
    canvas.getContext(
      "2d"
    );

  ctx.fillStyle =
    "#11151d";

  ctx.fillRect(
    0,
    0,
    512,
    128
  );

  ctx.fillStyle =
    "#f2d39a";

  ctx.font =
    "bold 58px Microsoft YaHei";

  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "middle";

  ctx.fillText(
    text,
    256,
    67
  );

  const texture =
    new THREE.CanvasTexture(
      canvas
    );

  texture.colorSpace =
    THREE.SRGBColorSpace;

  return new THREE.Mesh(

    new THREE.PlaneGeometry(
      3.2,
      .8
    ),

    new THREE.MeshStandardMaterial({

      map:
        texture,

      emissive:
        0x664422,

      emissiveIntensity:
        1

    })

  );

}
