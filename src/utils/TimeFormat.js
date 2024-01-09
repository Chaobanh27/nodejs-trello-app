
export const formattedTime = (e) => {
  const dateObject = new Date(e)
  const year = dateObject.getFullYear()
  const month = String(dateObject.getMonth() + 1).padStart(2, '0')
  const day = String(dateObject.getDate()).padStart(2, '0')
  const hours = String(dateObject.getHours()).padStart(2, '0')
  const minutes = String(dateObject.getMinutes()).padStart(2, '0')
  const seconds = String(dateObject.getSeconds()).padStart(2, '0')
  const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  return formattedTime
}

