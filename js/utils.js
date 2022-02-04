// biza elementlarni chaqirib olishimiz uchun function ichiga berb ketvomiz va 
// return qb qaytarvoti

let findElement = (element = document, selector) => {
  return element.querySelector(selector)
}