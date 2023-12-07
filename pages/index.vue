<template>
  <div>
    <h1>Hello World</h1>
    <div class="container">
      <button ref="start">Click</button>
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
import axios from 'axios'
import { Component } from 'nuxt-property-decorator'
import { VideoCallClient } from '~/types'
import { amazonChimeSdk, opentok } from '~/config/cpaas'

@Component
export default class App extends Vue {
  async mounted() {
    this.$refs.start.addEventListener('click', async () => {
      // opentok
      const apiKey = opentok.apiKey
      const sessionId = opentok.sessionId
      const token = opentok.token

      // amazon chime sdk
      const params = new URLSearchParams([['room', 'fancyroom']])
      const response = await axios.get('/chime-integration/meeting-session', {
        params,
      })
      const meeting = response.data.meetingResponse
      const attendee = response.data.attendeeResponse

      console.log('DEBUG -- initialize VideoCallClient')
      //this.$callService.initialize(VideoCallClient.OPENTOK)
      this.$callService.initialize(VideoCallClient.AWS_CHIME_SDK)

      console.log('DEBUG -- init session')
      await this.$callService.initSession({
        meeting,
        attendee,
      })

      console.log('DEBUG -- register streamcreated event')
      this.$callService.registerStreamCreatedCallback((stream: any) => {
        this.$callService.subscribe(stream, this.$refs.subscriber)
      })

      console.log('DEBUG -- init Publisher')
      await this.$callService.initPublisher(this.$refs.publisher as HTMLElement)

      console.log('DEBUG -- connect to the session')
      await this.$callService.connectSession(token)
    })
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
