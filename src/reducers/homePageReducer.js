const initState = {
  tableState:{
    loading: true,
    hasData: false,
    pagination: {
      defaultCurrent:1,
      defaultPageSize:5,
    }
  },
  detailCardState: {
    updating: false
  },
  tableColumnsConfig:[
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Height',
      dataIndex: 'height',
      sorter: (a, b) => a.height - b.height
    },
    {
      title: 'Mass',
      dataIndex: 'mass',
      sorter: (a, b) => a.mass - b.address.mass
    },
  ],
  totalCount: 0,
  currentPage: 1,
  selectedCharacterKey: -1,
  charactersDict:{}
}

const homePageReducer = (state=initState, action) => {
  switch(action.type) {
    case 'GET_CHARACTER_DATA_BY_PAGE':
      action.requestData.charactersArr.forEach(character=>state.charactersDict[character.key]=character)
      return {
        ...state,
        tableState: {
          loading: false,
          hasData: true
        },
        totalCount: action.requestData.totalCount,
        currentPage: action.requestData.currentPage,
        charactersDict: state.charactersDict
      }
    case 'UPDATING_DATA_TABLE':
      return {
        ...state,
        tableState:{
          loading: true,
          hasData:true
        }
      }
    case 'GET_CHARACTER_DETAIL_DATA':
      state.charactersDict[action.characterInfo.key] = action.characterInfo
      return {
        ...state,
        selectedCharacterKey: action.characterInfo.key,
        detailCardState: action.detailCardState
      }
    case 'UPDATING_CHARACTER_DETAIL':
      return {
        ...state,
        detailCardState: action.detailCardState
      }
    default:
      return state
  }
}

export default homePageReducer