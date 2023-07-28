import OT from '@opentok/client'
import { CallServiceClient } from '~/api/CallServiceClient/callServiceClient'
import { OpenTokSessionInfo, PublisherState } from '~/types'

export default class OpenTokCallClient implements CallServiceClient {
  private session: OT.Session | undefined
  private publisher: OT.Publisher | undefined
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initSession({ apiKey, sessionId }: OpenTokSessionInfo): Promise<void> {
    this.session = OT.initSession(apiKey, sessionId)

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

  connectSession(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      ;(this.session as OT.Session).connect(token, (error) => {
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

  publisherState: PublisherState = PublisherState.INITIAL
}
