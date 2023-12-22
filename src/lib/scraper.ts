import $ from 'jquery'

class Scraper {
  constructor() {
    this.init()
  }

  init() {
    $(() => {
      this.handleData()
    })
  }

  handleScrapeQuestionsRequest(tabId: number) {
    const handleScrapeQuestions = () => {
      const questionsMap = new Map<string, string[]>()

      const questionsContainer = document.body.getElementsByClassName(
        'bg-white border border-platform-border pb-10',
      )[0].firstElementChild

      let questionDivsArr: HTMLDivElement[] = []
      questionsContainer?.childNodes.forEach((node) => {
        if (node.nodeName === 'DIV') {
          questionDivsArr.push(node as HTMLDivElement)
        }
      })
      questionDivsArr.pop()

      questionDivsArr.forEach((qDiv, index) => {
        const question = qDiv.firstElementChild!.textContent!

        const answersDivArr: HTMLDivElement[] = []
        qDiv.lastElementChild?.childNodes.forEach((node) => {
          if (node.nodeName === 'DIV') {
            answersDivArr.push(node as HTMLDivElement)
          }
        })

        const answers = answersDivArr.map((aDiv) => {
          const textContent = aDiv.textContent
          return `${textContent?.charAt(0)}. ${textContent?.slice(1)}`
        })

        questionsMap.set(question, answers)
      })

      const questionsMapArr = Array.from(questionsMap.entries())

      chrome.runtime.sendMessage(chrome.runtime.id, {
        type: 'QUESTIONS_RESOLVE',
        data: { questionsMapArr },
      })
    }

    chrome.scripting.executeScript({
      target: { tabId },
      func: handleScrapeQuestions,
    })
  }

  handleData() {
    chrome.runtime.onMessage.addListener((request) => {
      if (request && request.type) {
        switch (request.type) {
          case 'QUESTIONS_SCRAPE': {
            this.handleScrapeQuestionsRequest(request.data.tabId)
            break
          }
        }
      }
    })
  }
}

new Scraper()
