export default {
  exractStringWithRegex(str, regex){
    let results = regex.exec(str)
    return results[1]
  }
}