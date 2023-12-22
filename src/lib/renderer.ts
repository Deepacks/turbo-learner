import $ from 'jquery'

class Renderer {
  constructor() {
    this.init()
  }

  init() {
    $(() => {
      this.resetShownData()
      this.checkHost()
      this.handleData()
    })
  }

  resetShownData() {
    if ($('#tl-extension__data__status')[0]) {
      $('#tl-extension__data__status').empty()
    }

    if ($('#tl-extension__data__error')[0]) {
      $('#tl-extension__data__error').empty()
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
        tabUrl?.startsWith('https://lms.pegaso.multiversity.click/videolezioni')
          ? 'tl-extension__body'
          : 'tl-extension__bad-host'
      }`

      $(elementToShow).removeClass('tl-extension__hidden')
    })
  }

  handleData() {
    chrome.runtime.onMessage.addListener((request) => {
      if (request && request.type) {
        switch (request.type) {
        }
      }
    })
  }
}

new Renderer()
