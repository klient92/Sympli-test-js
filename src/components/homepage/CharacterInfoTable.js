import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'
import { fetchCharacterInfoByPage, getCharacterDetail } from '../../actions/homepage/homePageActions'
import '../../styles/homepage/CharacterInfoTable.css'

export class CharacterInfoTable extends Component {
  // Fetch Initial Data from API
  componentDidMount() {
    this.props.getCharactersData(1)
  }
  // Page Change Event Listener
  onChange = (pagination, filters, sorter, extra) => {
    if(pagination.current * pagination.pageSize >= this.props.charactersData.length && this.props.charactersData.length<this.props.totalCount) {
      this.props.getCharactersData(this.props.currentPage + 1)
    }
  }
  // Row Click Handler
  onClick(record, rowIndex){
    this.props.getCharacterDetail(record)
  }

  render() {
    let { tableState, tableColumnsConfig, charactersData} = this.props
    return (
      <Table {...tableState} className='character-info-table' columns={tableColumnsConfig} 
      dataSource={tableState.hasData? charactersData : null} 
      bordered title={() => 'Table with list of people'} 
      onChange={this.onChange} onRow={(record, rowIndex) => {
        return {
          onClick: () => this.onClick(record, rowIndex)
        }}}/>
    )
  }
}

// Redux
const mapStateToProps = (state, ownProps) => {
  return {
    tableState: state.homePage.tableState,
    tableColumnsConfig: state.homePage.tableColumnsConfig,
    totalCount: state.homePage.totalCount,
    currentPage: state.homePage.currentPage,
    charactersData: Object.values(state.homePage.charactersDict)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCharactersData: (pagination) => dispatch(fetchCharacterInfoByPage(pagination)),
    getCharacterDetail: (filmsURL) => dispatch(getCharacterDetail(filmsURL))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CharacterInfoTable)