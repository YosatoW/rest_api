// import { textAnalysis } from './services/ai'

// const texts = ['I love Canada!', 'The earth is flat']

// for (const text of texts) {
//   const sentiment = await textAnalysis(text)
//   console.log(text)
//   console.log(sentiment)
// }

import { textAnalysis } from './services/ai'

async function testModels() {
  const texts = [
    'This is a harmless text.',
    'This text contains harmful content.',
    'Another example of a text to analyze.'
  ]

  for (const text of texts) {
    try {
      const result = await textAnalysis(text)
      console.log(`Analysis for text: "${text}"`)
      console.log(result)
    } catch (error) {
      console.error(`Error analyzing text: "${text}"`, error)
    }
  }
}

testModels()