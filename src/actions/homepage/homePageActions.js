import axios from 'axios'
import urlConstructor from '../../utils/urlConstructor'
import regexUtils from '../../utils/regexUtils'

// Actions
export const fetchCharacterInfoByPage = (pagination) => {
  let requestURL = `https://swapi.co/api/people/?page=${pagination}`
  return (dispatch, getState) => {
    dispatch({type:'UPDATING_DATA_TABLE', tableState:{loading:true}})
    axios.get(requestURL)
    .then((response)=>{
      if(response.status === 200){
        let data = response.data
        let totalCount = data.count
        let charactersData = constructCharacterData(data.results)
        let requestData = {
          totalCount: totalCount,
          currentPage: pagination,
          charactersArr: charactersData
        }
        dispatch({type:'GET_CHARACTER_DATA_BY_PAGE', requestData:requestData})
      }
    })
    .catch()
  }
}

export const getCharacterDetail = (record) => {
  return (dispatch, getState) => {
    if(record.films.length === 0 || record.filmsTitle !== undefined){
        dispatch({type:'GET_CHARACTER_DETAIL_DATA',  characterInfo:{...record}, detailCardState:{updating:false}}) 
    }else{
      dispatch({type:'UPDATING_CHARACTER_DETAIL',  detailCardState:{updating:true}})

      let promises = urlConstructor.constructFilmsRequest(record.films)
      const promisesResolved = promises.map(promise => promise.catch(error => ({ error })))
      
      axios.all(promisesResolved)
      .then(checkFailed((responses) => {
        let filmsTitleList = constructFilmsData(responses)
        dispatch({type:'GET_CHARACTER_DETAIL_DATA', characterInfo:{...record, filmsTitle:filmsTitleList}, detailCardState:{updating:false}})
      })).catch((feedbacks)=>{
        let validData = feedbacks.filter(feedback=> feedback.error == null)
        let filmsTitleList = constructFilmsData(validData)
        dispatch({type:'GET_CHARACTER_DETAIL_DATA', characterInfo:{...record, filmsTitle:filmsTitleList}, detailCardState:{updating:false}})
      })
    }
  }
}

// Helper
// Functions
function checkFailed (then) {
  return function (responses) {
    const someFailed = responses.some(response => response.error)

    if (someFailed) {
      throw responses
    }

    return then(responses)
  }
}

function constructCharacterData(dataSet){
  return dataSet.map(data => {
    let key = regexUtils.exractStringWithRegex(data.url, /\/([0-9]+)\//)
    return {...data, key:key}
  })
}

function constructFilmsData(films){
  return films.map(film => film.data.title)
}