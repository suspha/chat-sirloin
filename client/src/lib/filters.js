const filters = {}

filters.date = (date) => {
  if(!date){
    return ''
  }
  // sjekke om det er en string eller date
  if(typeof date === 'string') {
    date = new Date(date)
  }
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear().toString().substr(-2)
  const hour = date.getHours();
  const minutes = date.getMinutes()

  return day + '.' + month + '.' + year + ' ' + hour + ':' + minutes
}

export default filters