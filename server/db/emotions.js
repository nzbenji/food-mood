const connection = require('./index')

module.exports = {
  getEmotions,
  getRecentEmotion,
  latestEmotion
}

function getEmotions (db = connection) {
  return db('emotions')
}

function getRecentEmotion (db = connection) {
  return db('emotions')
    .first()
 }

 function latestEmotion (emotionId, db = connection) {
   return db('emotions')
   .join('moods', 'moods.emotion_id', 'emotions.id')
   .where('emotions.id', emotionId)
   .orderBy('moods.time', 'desc')
   .first()
 }



