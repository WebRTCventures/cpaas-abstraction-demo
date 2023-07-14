<template>
  <div>
    <h1>Hello World</h1>
    <div class="container">
      <div class="videos">
        <video id="localVideo" autoplay></video>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'nuxt-property-decorator'

@Component
export default class App extends Vue {
  mounted() {
    this.$callService.initialize('opentok')
  }
}
</script>

<style>
h1 {
  text-align: center;
}
.container {
  display: flex;
  flex-direction: row;
  height: 85vh;
}
.videos {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow: hidden;
}
.videos video {
  width: 100%;
  height: 100%;
  grid-row: 1 / span 2;
  grid-column: 1 / span 2;
  object-fit: cover;
  background-color: aqua;
}
</style>