
import axios from 'axios'

export default {

  constructFilmsRequest(filmsURL) {
    let axiosGetArray = filmsURL.map(url => axios.get(url))
    return axiosGetArray
  }

}