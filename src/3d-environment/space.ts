import { ActionManager, Color3, DirectionalLight, Engine, ExecuteCodeAction, HighlightLayer, MeshBuilder,Scene, SceneLoader, ShadowGenerator, Vector3 } from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import '@babylonjs/inspector';
import '@babylonjs/core/Loading/loadingScreen';
import '@babylonjs/loaders/glTF';
import '@babylonjs/core/Materials/standardMaterial';
import '@babylonjs/core/Materials/Textures/Loaders/envTextureLoader';
export default class Game {
	private engine: Engine;
	public scene: any;
	public canvas: Element;
	constructor(elem) {
		this.engine = new Engine(elem, true);
		this.scene = new Scene(this.engine);
		this.canvas = elem;
		// this.scene.debugLayer.show();
	}

	setup() {
		
        //**for development: make inspector visible/invisible
        window.addEventListener("keydown", (ev) => {
            //Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (this.scene.debugLayer.isVisible()) {
                    this.scene.debugLayer.hide();
                } else {
                    this.scene.debugLayer.show();
                }
            }
        });
		this.scene.createDefaultCameraOrLight(true, true, true);
		SceneLoader.ImportMesh('', 'CasualRoomModel.glb', '', this.scene, (meshes) => {
			meshes.forEach((mesh) => {
				// mesh.scaling.x = 6;
				// mesh.scaling.y = 6;
				// mesh.scaling.z = 6;
				// mesh.position.y = -2
				this.scene.addMesh(mesh);

				this.scene.meshes.forEach(element => {
					if (mesh.name == "Board_primitive8"
						|| mesh.name == "PC_primitive1" || mesh.name == "PC_primitive1"
						|| mesh.name == "Mug.001_primitive0" || mesh.name == "Mug_primitive0"
						|| mesh.name == "Bed frame"
					
					) {
						var hl = new HighlightLayer("hl1", this.scene);
						mesh.actionManager = new ActionManager(this.scene);
						mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, function (ev) {
							hl.addMesh(mesh, Color3.Green());
							// this.scene.hoverCursor = "pointer";
							console.log("test");
							// hl.addMesh(mesh, BABYLON.Color3.Green());
						}));
						mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, function(ev){
							hl.removeMesh(mesh, Color3.Green());
						}));
					}
				});
			});
			let rootNode = meshes[0].getScene().getMeshByName(meshes[0].name);
			if (rootNode) {
				let rootNodeId = rootNode.uniqueId;
				rootNode.position.y = -2;
			}
			this.scene.createDefaultCameraOrLight(true, true, true);
			this.scene.activeCamera.useAutoRotationBehavior = true;
			this.scene.activeCamera.beta -= 0.2;
			this.scene.activeCamera.upperRadiusLimit = 27.1305;

			this.scene.lights[0].dispose();
			var light = new DirectionalLight('light1', new Vector3(-2, -3, 1), this.scene);
			light.position = new Vector3(6, 9, 3);
			var generator = new ShadowGenerator(512, light);
			generator.useBlurExponentialShadowMap = true;
			generator.blurKernel = 32;

			for (var i = 0; i < this.scene.meshes.length; i++) {
				generator.addShadowCaster(this.scene.meshes[i]);
			}

			var helper = this.scene.createDefaultEnvironment({
				enableGroundMirror: true,
				groundShadowLevel: 0.6
			});
			
			// helper.setMainColor(BABYLON.Color3.Teal());
		});
		// Resize handler
		window.addEventListener('resize', () => {
			this.engine.resize();
		});
		var guiTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

		var button = GUI.Button.CreateSimpleButton('button', 'Carlo Portfolio');
		button.width = '250px';
		button.height = '80px';
		button.color = 'white';
		button.background = 'transparent';
		button.verticalAlignment = 0;
		button.horizontalAlignment = 2;
		button.paddingTop = 10;
		guiTexture.addControl(button);
		this.scene.onPointerDown = function (evt, pickResult) {
			if (pickResult.hit) {
				console.log(pickResult.pickedMesh.name)
				if (pickResult.pickedMesh.name == "PC_primitive1"){
					window.open("https://carloidobaja26.github.io/", '_blank');
				}
				if (pickResult.pickedMesh.name == "Mug.001_primitive0" || pickResult.pickedMesh.name == "Mug_primitive0"){
					//gcash
					window.open("https://carloidobaja26.github.io/files/CarloGcash.jpg", '_blank');
				}
				if (pickResult.pickedMesh.name == "Bed_primitive2"){
					//gcash
					window.open("https://youtu.be/Vyfx9FwmHMY", '_blank');
				}
			}
		}
	}

	run() {
		this.engine.runRenderLoop(() => this.scene.render());
	}
	modal(showModal) {
		console.log(showModal);
		// this.scene.onPointerDown = function (evt, pickResult) {
		// 	if (pickResult.hit) {
		// 		// console.log(pickResult.pickedMesh.name)
		// 		if (pickResult.pickedMesh.name == "PC_primitive1") {
		// 			// window.open("https://carloidobaja26.github.io/", '_blank');
		// 			this.set({ showModal: true });
		// 		}
		// 	}
		// }
	}
}
