import { h, render } from 'preact'
import { createApplicationStore } from './store'
import { Provider } from 'preact-redux'
import { ApplicationContainer } from './views/application-container'

declare const module: any
if (module.hot) {
  module.hot.dispose(() => {
    // Force the old component go through teardown steps
    render(<div />, document.body, document.body.lastElementChild || undefined)
  })
  module.hot.accept()
}

const lastStore: any = (window as any)['store']
const store = createApplicationStore(lastStore ? lastStore.getState() : {})
  ; (window as any)['store'] = store

export default function speedscope(element: any, name: string, profile: string) {
  console.log(`speedscope v${require('../package.json').version} is loading profile: ${name}}`)

  render(
    <Provider store={store}>
      <ApplicationContainer {...{ overrideProfileName: name, overrideProfileBody: profile }} />
    </Provider>,
    element
  )
}
