export function getEmoji (emotions, emotionId) {
  const emotion = emotions.find(emotion => emotion.id === emotionId)
  if (emotion) return emotion.emoji
  return ''
}
