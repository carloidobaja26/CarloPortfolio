<script>
	import { onMount } from "svelte";
	import Game from "./3d-environment/space";
	import Modal from "./modal/Modal.svelte";
	import Modal2 from "./modal/Modal2.svelte";
	import LoremIpsum from "./lib/LoremIpsum.svelte";
	import FloatingHelpIcon from "./lib/FloatingHelpIcon.svelte";
	let showModal = false;
	let showModalTodo = false;
	let canvas;
	let gameScene;
	const helpContent = `
    <p>This is some help content.</p>
    <p>You can add any HTML or Svelte code here.</p>
 	 `;
	onMount(async () => {
		let game = new Game(canvas);
		game.setup();
		game.run();
		gameScene = game.scene;
		game.scene.onPointerDown = function (evt, pickResult) {
			if (pickResult.hit) {
				// console.log(pickResult.pickedMesh.name);
				if (pickResult.pickedMesh.name == "PC_primitive1") {
					window.open("https://carloidobaja26.github.io/", "_blank");
				}
				if (
					pickResult.pickedMesh.name == "Mug.001_primitive0" ||
					pickResult.pickedMesh.name == "Mug_primitive0"
				) {
					//gcash
					showModal = true;
					// window.open("https://carloidobaja26.github.io/files/CarloGcash.jpg", '_blank');
				}
				if (
					pickResult.pickedMesh.name == "Bed_primitive2" ||
					pickResult.pickedMesh.name == "Bed frame"
				) {
					//gcash
					window.open("https://youtu.be/Vyfx9FwmHMY", "_blank");
				}
				if (pickResult.pickedMesh.name == "Board_primitive8") {
					//gcash
					showModalTodo = true;
					// window.open("https://youtu.be/Vyfx9FwmHMY", '_blank');
				}
			}
		};
		//   showModal = true
	});
</script>

<main>
	<canvas bind:this={canvas} id="app" />
</main>

<Modal bind:showModal>
	<h2 slot="header">Support Me by Giving me Monehhh</h2>
	<ol class="definition-list">
		<img
			src="https://carloidobaja26.github.io/files/CarloGcash2.jpg"
			style="width: 35vw;"
			alt="gcash"
		/>
	</ol>
</Modal>
<Modal2 bind:showModalTodo>
	<div slot="header">
		<h1>Board Description Modal</h1>
	</div>
	<p>
		{#each Array(5) as _item}
			<LoremIpsum />
		{/each}
	</p>
</Modal2>
<div>
	<FloatingHelpIcon {helpContent} {gameScene} />
	<!-- Rest of your component's code -->
</div>

<style>
	main {
		width: 100vw;
		height: 100vh;
		padding: 0;
		margin: 0;
		overflow: hidden;
	}
	canvas {
		width: 100%;
		height: 100%;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
