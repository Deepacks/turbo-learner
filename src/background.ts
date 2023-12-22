chrome.runtime.onMessage.addListener(async (request, sender) => {
  if (request && request.type) {
    switch (request.type) {
      case 'QUESTIONS_DATA': {
        chrome.scripting.executeScript({
          target: { tabId: request.tabId },
          func: () => {
            console.log('MIAOOOOOOO')
          },
        })
        break
      }
    }
  }
})
