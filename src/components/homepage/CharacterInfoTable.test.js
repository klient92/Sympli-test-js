import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import CharacterInfoTable from './CharacterInfoTable'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
  homePage: {
    tableState:{
      loading: false,
      hasData: true,
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
    totalCount: 8,
    currentPage: 1,
    selectedCharacterKey: -1,
    charactersDict:{
      1:{key:1, name:'chao1', height:176, mass:63},
      2:{key:2, name:'chao2', height:176, mass:63},
      3:{key:3, name:'chao3', height:176, mass:63},
      4:{key:4, name:'chao4', height:176, mass:63},
      5:{key:5, name:'chao5', height:176, mass:63},
      6:{key:6, name:'chao6', height:176, mass:63},
      7:{key:7, name:'chao7', height:176, mass:63},
      8:{key:8, name:'chao8', height:176, mass:63}
    }
  }
}

const store = mockStore(initState)

// Action
// const addTodo = () => ({ type: 'GET_CHARACTER_DATA_BY_PAGE' })
const setUp = (props={}) => {
  const component = mount(<CharacterInfoTable store={store}/>);
  return component;
};

describe('>>> CHARACTER_DATA_TABLE --- Shallow Render REACT COMPONENTS',()=>{
  let component
  beforeEach(() => {
    component = setUp()
  })

  it('+++ render the Table', () => {
    const wrapper = component.find('.character-info-table').hostNodes()
    expect(wrapper.length).toBe(1)
 });

 it('+++ click the pagination', () => {
  const firstPage = component.find('.character-info-table .ant-table-tbody tr')
  expect(firstPage.length).toBe(5)
  component.find('.character-info-table .ant-pagination-next').simulate('click');
  const secondPage = component.find('.character-info-table .ant-table-tbody tr')
  expect(secondPage.length).toBe(3)
  });
})

