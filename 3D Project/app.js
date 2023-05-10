const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = () => {
  const scene = new BABYLON.Scene(engine);
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 4,
    10,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 20, height: 20 },
    scene
  );
  ground.material = new BABYLON.StandardMaterial("groundMaterial", scene);
  ground.material.diffuseColor = new BABYLON.Color3(0.5, 1, 0.5);

  const player = BABYLON.MeshBuilder.CreateBox("player", { size: 1 }, scene);
  player.position.y = 0.5;

  const greenObjects = [];
  const pollutionObjects = [];

  for (let i = 0; i < 10; i++) {
    const greenObject = BABYLON.MeshBuilder.CreateCylinder(
      "greenObject",
      { height: 1, diameterTop: 0, diameterBottom: 0.5 },
      scene
    );
    greenObject.position = new BABYLON.Vector3(
      Math.random() * 18 - 9,
      0.5,
      Math.random() * 18 - 9
    );
    greenObject.material = new BABYLON.StandardMaterial("greenMaterial", scene);
    greenObject.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
    greenObjects.push(greenObject);

    const pollutionObject = BABYLON.MeshBuilder.CreateSphere(
      "pollutionObject",
      { diameter: 1 },
      scene
    );
    pollutionObject.position = new BABYLON.Vector3(
      Math.random() * 18 - 9,
      0.5,
      Math.random() * 18 - 9
    );
    pollutionObject.material = new BABYLON.StandardMaterial(
      "pollutionMaterial",
      scene
    );
    pollutionObject.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
    pollutionObjects.push(pollutionObject);
  }

  return scene;
};

const scene = createScene();
engine.runRenderLoop(() => scene.render());
