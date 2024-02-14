module.exports = getHour = () => {
  const time = new Date()
  const hour = time.getHours() % 8
  return hour
}