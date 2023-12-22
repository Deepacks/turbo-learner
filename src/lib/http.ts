import $ from 'jquery'

class Http {
  constructor() {
    this.init()
  }

  init() {
    $(() => {
      this.handleData()
    })
  }

  handleQuestionsResolveRequest(questionsMapArr: [string, string[]][]) {
    let requestText =
      "La seguente è una lista di domande e possibili risposte a un test. Prova a rispondere a tutte le domande, in ordine dalla prima all'ultima, fornendo l'ipotesi più probabile, insieme al motivo\n\n"

    questionsMapArr.forEach(([question, answers]) => {
      requestText = `${requestText}${question}\n${answers.join('\n')}\n\n`
    })
  }

  handleData() {
    chrome.runtime.onMessage.addListener((request) => {
      if (request && request.type) {
        switch (request.type) {
          case 'QUESTIONS_RESOLVE': {
            this.handleQuestionsResolveRequest(request.data.questionsMapArr)
            break
          }
        }
      }
    })
  }
}

new Http()
