import $ from 'jquery'

class Main {
  constructor() {
    this.init()
  }

  init() {
    $(() => {
      this.resetShownData()

      this.handleLoadQuestions()
      this.handleData()
    })
  }

  resetShownData() {
    if ($('#tl-extension__data')[0]) {
      $('#tl-extension__data').empty()
    }
  }

  handleLoadQuestions() {
    $(() => {
      $('#tl-extension__btn').on('click', async () => {
        const tabData = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        })
        const tabId = tabData[0].id

        const handleCurrentTab = (tabId: number) => {
          // const documentHtml = document.body.innerHTML
          // const context = documentHtml.toString()

          chrome.runtime.sendMessage(chrome.runtime.id, {
            type: 'QUESTIONS_DATA',
            data: 'Hello',
            tabId,
          })
        }

        if (tabId) {
          chrome.scripting.executeScript({
            target: { tabId },
            func: handleCurrentTab,
            args: [tabId],
          })
        }
      })
    })
  }

  handleData() {
    chrome.runtime.onMessage.addListener((request, sender) => {
      if (request && request.type) {
        switch (request.type) {
          case 'QUESTIONS_DATA': {
            $('#tl-extension__data').html(request.data)
            break
          }
        }
      }
    })
  }
}

new Main()
