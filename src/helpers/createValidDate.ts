const createValidDate = (date: Date) => {
  return date.toISOString().slice(0, 10)
}

module.exports = createValidDate;
