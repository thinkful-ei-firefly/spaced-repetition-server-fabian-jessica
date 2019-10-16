const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const jsonBodyParser = express.json()

const languageRouter = express.Router()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    try {
      const word = await LanguageService.getHead(
        req.app.get('db'),
        req.language.head,
      )
      res.json({
        nextWord: word.original,
        wordCorrectCount: word.correct_count,
        wordIncorrectCount: word.incorrect_count,
        totalScore: req.language.total_score
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .post('/guess', jsonBodyParser, async (req, res, next) => {
    try {
      const guess = req.body.guess

      if (!guess) {
        res.status(400).json({error: "Missing 'guess' in request body"})
      }

      const head = await LanguageService.getHead(
        req.app.get('db'),
        req.language.head,
      )
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      const languageData = req.language

      if (guess.toLowerCase() === head.translation.toLowerCase()) {
        head.memory_value *= 2
        head.correct_count ++
        languageData.total_score++
      }
      else {
        head.memory_value = 1
        head.incorrect_count ++
      }

      const LinkedList = LanguageService.wordsArrayToList(words, head)
      const modifiedNodes = LanguageService.moveHeadBack(LinkedList, head.memory_value)

      const wordArray = LanguageService.listToWordsArray(LinkedList)
      languageData.head = wordArray[0].id

      //update language parameters in DB
      const newHead = await LanguageService.updateHead(req.app.get('db'), languageData.user_id, languageData)

      //update word values in DB
      for (let i = 0; i < modifiedNodes.length; i++) {
        await LanguageService.updateWord(req.app.get('db'), modifiedNodes[i].id, modifiedNodes[i])
      }

      //return response to user     

      res.json({ 
        "nextWord": wordArray[0].original,
        "wordCorrectCount": wordArray[0].correct_count,
        "wordIncorrectCount": wordArray[0].incorrect_count,
        "totalScore": languageData.total_score,
        "answer": head.translation,
        "isCorrect": guess.toLowerCase() === head.translation.toLowerCase()
      })
      next()
    } catch (error) {
      next(error)
    }
    
  })

module.exports = languageRouter
