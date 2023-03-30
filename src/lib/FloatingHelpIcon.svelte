<script>
  import { CubicEase, Curve3, EasingFunction, Path3D, Tools, Vector3 } from "@babylonjs/core";
  import "@babylonjs/core/Animations/animatable";
  export let helpContent;
  export let gameScene;
  let isHelpOpen = false;
  function toggleHelp() {
    isHelpOpen = !isHelpOpen;
    // console.log(gameScene.cameras);
    // debugger;

  }
  function goToCoffeTable() {
    const camera = gameScene.activeCamera;
    camera.radius = 10;
    camera.alpha = -2.5216
    camera.beta = 1.4883
  }
  function goToBookCase() {
    const camera = gameScene.activeCamera;
    camera.radius = 0.1968;
    camera.alpha = -0.9688
    camera.beta = 1.4046
  }
  function goToComputerDesk() {
    const camera = gameScene.activeCamera;
    camera.radius = 0.1964
    camera.alpha = -3.6605
    camera.beta = 1.2875
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="floating-help-icon" on:click={toggleHelp}>
  <i class="fa fa-question-circle fa-2x" />
</div>

{#if isHelpOpen}
  <div class="help-modal">
    <!-- {helpContent} -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="test" on:click={goToCoffeTable} style="text-decoration: underline;">Go to Coffe Table</div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="test" on:click={goToBookCase} style="text-decoration: underline;">Go to BookCase</div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="test" on:click={goToComputerDesk} style="text-decoration: underline;">Go to ComputerDesk</div>
    <!-- <p>You can add any HTML or Svelte code here.</p> -->
  </div>
{/if}

<style>
  .floating-help-icon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    background-color: #fff;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .help-modal {
    position: fixed;
    bottom: 90px;
    right: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 20px;
    max-width: 400px;
    z-index: 9998;
  }
</style>
