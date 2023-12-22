import $ from 'jquery'

// chrome.windows.create({
//   url: chrome.runtime.getURL('my_page.html'),
//   type: 'popup',
//   height: 600,
//   width: 600,
// })

class Main {
  constructor() {
    this.init()
  }

  init() {
    $(() => {
      this.attachEvents()
    })
  }

  attachEvents() {
    $(() => {
      $('#tl-extension__btn').on('click', async () => {
        const tabData = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        })
        const tabId = tabData[0].id

        const handleScraperCall = (tabId: number) => {
          chrome.runtime.sendMessage(chrome.runtime.id, {
            type: 'QUESTIONS_SCRAPE',
            data: { tabId },
          })
        }

        if (tabId) {
          chrome.scripting.executeScript({
            target: { tabId },
            func: handleScraperCall,
            args: [tabId],
          })
        }
      })
    })
  }
}

new Main()
