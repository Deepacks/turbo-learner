import $ from 'jquery'

class Renderer {
  constructor() {
    this.init()
  }

  init() {
    $(() => {
      this.resetRender()
      this.checkHost()
      this.handleData()
    })
  }

  resetRender() {
    if ($('#tl-extension__data__status')[0]) {
      const statusElement = $('#tl-extension__data__status')
      statusElement.empty()
      statusElement.addClass('tl-extension__hidden')
    }

    if ($('#tl-extension__data__error')[0]) {
      const errorElement = $('#tl-extension__data__error')
      errorElement.empty()
      errorElement.addClass('tl-extension__hidden')
    }
  }

  checkHost() {
    $(async () => {
      const tabData = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      })
      const tabUrl = tabData[0].url

      const elementToShow = `#${
        tabUrl?.startsWith('https://lms.pegaso.multiversity.click')
          ? 'tl-extension__body'
          : 'tl-extension__bad-host'
      }`

      $(elementToShow).removeClass('tl-extension__hidden')
    })
  }

  renderText(isError: boolean, message: string) {
    const targetElement = $(
      `#${
        isError ? 'tl-extension__data__error' : 'tl-extension__data__status'
      }`,
    )
    targetElement.removeClass('tl-extension__hidden')
    targetElement.html(message)
  }

  handleData() {
    chrome.runtime.onMessage.addListener((request) => {
      if (request && request.type) {
        switch (request.type) {
          case 'RENDER_CALL': {
            this.renderText(request.data.isError, request.data.message)
            break
          }
          case 'RENDER_RESET': {
            this.resetRender()
            break
          }
        }
      }
    })
  }
}

new Renderer()
