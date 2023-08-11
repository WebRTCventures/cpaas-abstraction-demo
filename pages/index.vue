<template>
  <div>
    <h1>Hello World</h1>
    <div class="container">
      <div id="videos" class="videos">
        <div id="publisher" ref="publisher"></div>
        <div id="subscriber" ref="subscriber"></div>
      </div>
    </div>
    <script src="https://static.opentok.com/v2/js/opentok.min.js"></script>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { VideoCallClient } from '~/types';

@Component
export default class App extends Vue {
  async mounted() {
    const apiKey = this.$config.apiKey
    const sessionId = this.$config.sessionId
    const token = this.$config.token

    console.log('DEBUG -- initialize VideoCallClient')
    this.$callService.initialize(VideoCallClient.OPENTOK)

    console.log('DEBUG -- init session')
    await this.$callService.initSession({
      apiKey,
      sessionId
    })

    console.log('DEBUG -- register streamcreated event')
    this.$callService.registerStreamCreatedCallback((stream: any) => {
      this.$callService.subscribe(stream, this.$refs.subscriber)
    })

    console.log('DEBUG -- init Publisher')
    await this.$callService.initPublisher(this.$refs.publisher as HTMLElement)

    console.log('DEBUG -- connect to the session')
    await this.$callService.connectSession(token)
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
