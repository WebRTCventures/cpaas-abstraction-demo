<template>
  <div>
    <div class="header">
      <h1>CPaaS Abstraction Demo</h1>
      <button id="start" ref="start">Join</button>
    </div>
    <div class="container">
      <div id="videos" class="videos">
        <div id="publisher" ref="publisher"></div>
        <div id="subscriber" ref="subscriber"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import { VideoCallClient } from '~/types'

@Component
export default class App extends Vue {
  async mounted() {
    const start = this.$refs.start as HTMLButtonElement
    start.addEventListener('click', async () => {
      const selected_cpaas = VideoCallClient.OPENTOK

      const params = new URLSearchParams([
        ['room', 'fancyroom'],
        ['cpaas', selected_cpaas],
      ])
      const response = await this.$axios.get('/cpaas-integration/meeting-session', {
        params,
      })

      console.log('DEBUG -- initialize VideoCallClient')
      //this.$callService.initialize(VideoCallClient.OPENTOK)
      this.$callService.initialize(selected_cpaas, response.data)

      console.log('DEBUG -- init session')
      await this.$callService.initSession()

      console.log('DEBUG -- register streamcreated event')
      this.$callService.registerStreamCreatedCallback((stream: any) => {
        this.$callService.subscribe(stream, this.$refs.subscriber)
      })

      console.log('DEBUG -- init Publisher')
      await this.$callService.initPublisher(this.$refs.publisher as HTMLElement)

      console.log('DEBUG -- connect to the session')
      await this.$callService.connectSession()
    })
  }
}
</script>

<style>
.header {
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
