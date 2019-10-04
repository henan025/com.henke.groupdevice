const generateUuid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  }
  return s4() + s4() + '-h' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

const sleep = async (secunds = 1) => {
  const promise = new Promise((res, rej) => {
    setTimeout(() => res(), secunds * 1000)
  })
  return promise
}
/*
module.exports = {
  sleep,
  generateUuid
}
*/