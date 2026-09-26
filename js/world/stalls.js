import * as THREE
from "three";

import {
  createSteam
} from "../effects/steam.js";

const FOOD = [

  "烧烤",
  "小龙虾",
  "臭豆腐",
  "烤冷面",
  "奶茶",
  "冰粉",
  "炸串",
  "章鱼烧",
  "水果杯",
  "煎饼"

];

const CRAFT = [

  "手作饰品",
  "杭州文创",
  "手绘扇",
  "原创设计",
  "草编",
  "陶艺",
  "手机饰品",
  "创意百货"

];

export function createStalls(
  scene
) {

  let index = 0;

  for (
    let z = 11;
    z > -116;
    z -= 5.8
  ) {

    const leftFood =
      index % 3 !== 0;

    const rightFood =
      index % 4 !== 0;

    createStall(

      scene,

      -5.9,

      z,

      leftFood
        ? FOOD[
            index %
            FOOD.length
          ]
        : CRAFT[
            index %
            CRAFT.length
          ],

      leftFood
        ? "food"
        : "craft",

      "left",

      index

    );

    createStall(

      scene,

      5.9,

      z - 2.6,

      rightFood
        ? FOOD[
            (index + 4) %
            FOOD.length
          ]
        : CRAFT[
            (index + 2) %
            CRAFT.length
          ],

      rightFood
        ? "food"
        : "craft",

      "right",

      index + 1

    );

    index++;

  }

}

function createStall(
  scene,
  x,
  z,
  name,
  type,
  side,
  index
) {

  const stall =
    new THREE.Group();

  const metal =
    new THREE.MeshStandardMaterial({

      color:
        0x45484d,

      metalness:
        .65,

      roughness:
        .35

    });

  /*
    Metal frame
  */

  for (
    const px of [-1.55,1.55]
  ) {

    for (
      const pz of [-.9,.9]
    ) {

      const pole =
        new THREE.Mesh(

          new THREE.CylinderGeometry(
            .035,
            .035,
            2.7,
            6
          ),

          metal

        );

      pole.position.set(
        px,
        1.35,
        pz
      );

      stall.add(pole);

    }

  }


  /*
    Modern tent canopy
  */

  const canopyColors = [

    0x2562a6,
    0xb93631,
    0xe7e4dc,
    0x304f86

  ];

  const canopy =
    new THREE.Mesh(

      new THREE.ConeGeometry(
        2.35,
        .75,
        4
      ),

      new THREE.MeshStandardMaterial({

        color:
          canopyColors[
            index %
            canopyColors.length
          ],

        roughness:
          .75

      })

    );

  canopy.rotation.y =
    Math.PI / 4;

  canopy.scale.z =
    .75;

  canopy.position.y =
    3;

  canopy.castShadow =
    true;

  stall.add(canopy);


  /*
    Counter
  */

  const counter =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        3,
        .82,
        1.6
      ),

      new THREE.MeshStandardMaterial({

        color:
          0x45403b,

        roughness:
          .72

      })

    );

  counter.position.y =
    .42;

  counter.castShadow =
    true;

  stall.add(counter);


  /*
    Name banner
  */

  const banner =
    createBanner(
      name,
      type
    );

  banner.position.set(
    0,
    2.25,
    side === "left"
      ? -1.01
      : 1.01
  );

  if (
    side === "right"
  ) {

    banner.rotation.y =
      Math.PI;

  }

  stall.add(banner);


  /*
    Goods
  */

  if (
    type === "food"
  ) {

    createFoodDisplay(
      stall
    );

    if (
      index % 2 === 0
    ) {

      createSteam(
        scene,
        x,
        z
      );

    }

  } else {

    createCraftDisplay(
      stall
    );

  }


  /*
    LED bars
  */

  for (
    const px of [-1.2,1.2]
  ) {

    const led =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .035,
          .035,
          1.5
        ),

        new THREE.MeshStandardMaterial({

          color:
            0xffffff,

          emissive:
            0xffffff,

          emissiveIntensity:
            4

        })

      );

    led.position.set(
      px,
      2.45,
      0
    );

    stall.add(led);

  }


  /*
    Real light on selected stalls
  */

  if (
    index % 3 === 0
  ) {

    const light =
      new THREE.PointLight(

        type === "food"
          ? 0xffb067
          : 0xddeaff,

        9,

        4.5,

        2

      );

    light.position.set(
      0,
      2.2,
      0
    );

    stall.add(light);

  }


  stall.position.set(
    x,
    0,
    z
  );

  scene.add(stall);

}

function createFoodDisplay(
  stall
) {

  const metal =
    new THREE.MeshStandardMaterial({

      color:
        0x202124,

      metalness:
        .75,

      roughness:
        .25

    });

  const pan =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        .45,
        .4,
        .13,
        20
      ),

      metal

    );

  pan.position.set(
    -.75,
    .9,
    0
  );

  stall.add(pan);


  /*
    Food trays
  */

  const foodColors = [

    0xaa3b1e,
    0xd68b2c,
    0x679044,
    0xd8b763

  ];

  for (
    let i = 0;
    i < 4;
    i++
  ) {

    const tray =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          .5,
          .07,
          .45
        ),

        metal

      );

    tray.position.set(
      .05 +
      i * .58,
      .88,
      0
    );

    stall.add(tray);


    for (
      let f = 0;
      f < 5;
      f++
    ) {

      const food =
        new THREE.Mesh(

          new THREE.SphereGeometry(
            .055 +
            Math.random() *
            .025,

            6,
            5
          ),

          new THREE.MeshStandardMaterial({

            color:
              foodColors[
                i %
                foodColors.length
              ]

          })

        );

      food.position.set(

        -.13 +
        i * .58 +
        Math.random() *
        .3,

        .96,

        -.14 +
        Math.random() *
        .28

      );

      stall.add(food);

    }

  }

}

function createCraftDisplay(
  stall
) {

  const colors = [

    0xff6f91,
    0x6fc6ff,
    0xf4d26b,
    0x9bd581,
    0xb58be0,
    0xffffff

  ];

  for (
    let row = 0;
    row < 3;
    row++
  ) {

    for (
      let i = 0;
      i < 7;
      i++
    ) {

      const item =
        new THREE.Mesh(

          new THREE.SphereGeometry(
            .06,
            8,
            6
          ),

          new THREE.MeshStandardMaterial({

            color:
              colors[
                (
                  i + row
                ) %
                colors.length
              ],

            metalness:
              .25,

            roughness:
              .4

          })

        );

      item.position.set(

        -.9 +
        i * .3,

        .88 +
        row * .18,

        -.3 +
        row * .28

      );

      stall.add(item);

    }

  }

}

function createBanner(
  text,
  type
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

    type === "food"

    ? "#c8322d"

    : "#315f91";

  ctx.fillRect(
    0,
    0,
    512,
    128
  );

  ctx.fillStyle =
    "#ffffff";

  ctx.font =
    "bold 64px Microsoft YaHei";

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
      2.8,
      .7
    ),

    new THREE.MeshStandardMaterial({

      map:
        texture,

      emissive:
        type === "food"
        ? 0x66110c
        : 0x102f55,

      emissiveIntensity:
        1

    })

  );

}
