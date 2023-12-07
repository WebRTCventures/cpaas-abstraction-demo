import OT from '@opentok/client'
import { CallServiceClient } from '~/api/CallServiceClient/callServiceClient'
import { AwsChimeSessionInfo, OpenTokSessionInfo } from '~/types'

export default class OpenTokCallClient implements CallServiceClient {
  credentials: OpenTokSessionInfo
  private session: OT.Session | undefined
  private publisher: OT.Publisher | undefined
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
 
  constructor(credentials : OpenTokSessionInfo) {
    this.credentials = credentials
  }

  initSession(): Promise<void> {
    this.session = OT.initSession(this.credentials.apiKey, this.credentials.sessionId)

    return Promise.resolve()
  }

  initPublisher(targetElement: HTMLElement): Promise<void> {
    return new Promise((resolve, reject) => {
      this.publisher = OT.initPublisher(
        targetElement,
        {
          insertMode: 'replace',
          width: '100%',
          height: '100%',
        },
        (error) => {
          if (error) {
            reject(error)
          }

          resolve()
        }
      )
    })
  }

  connectSession(): Promise<void> {
    return new Promise((resolve, reject) => {
      ;(this.session as OT.Session).connect(this.credentials.token, (error) => {
        if (error) {
          reject(error)
        }

        ;(this.session as OT.Session).publish(
          this.publisher as OT.Publisher,
          (error) => {
            if (error) {
              reject(error)
            }

            resolve()
          }
        )
      })
    })
  }

  registerStreamCreatedCallback(callback: (stream: any) => void): void {
    this.session?.on('streamCreated', (e) => {
      callback(e.stream)
    })
  }

  subscribe(stream: OT.Stream, targetElement: HTMLElement): Promise<void> {
    return new Promise((resolve, reject) => {
      (this.session as OT.Session).subscribe(stream, targetElement, {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      }, (error) => {
        if (error) {
          reject(error)
        }

        resolve()
      })
    })
  }
}
