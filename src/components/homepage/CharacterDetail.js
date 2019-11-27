import React from 'react'
import { Card, Icon } from 'antd';
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'
import '../../styles/homepage/CharacterDetail.css'

function CharacterDetail(props) {

  let { characterInfo, updating } = props

  return (
    props.characterInfo === undefined ? null : 
    <CSSTransitionGroup
    transitionName="example"
    transitionAppear={true}
    transitionAppearTimeout={1000}
    transitionEnter={false}
    transitionLeave={false}>
      <Card className="homepage-character-detail" title='Detail Section' bordered={true}>
      {
        updating?
        <Icon className='detail-content-loading' type="loading" />
        :
        <div className="detail-content">
        <p>Name: {characterInfo.name}</p>
        <p>Birth Year: {characterInfo.birth_year}</p>
        <p>Gender: {characterInfo.gender}</p>
        <span>List of Films: {characterInfo.filmsTitle.join(',')}</span>
        </div>
      }
      </Card>
    </CSSTransitionGroup>
  )
}

const mapStatesToProps = (state) => {
  console.log(state)
  return {
    characterInfo: state.homePage.charactersDict[state.homePage.selectedCharacterKey],
    updating: state.homePage.detailCardState.updating
  }
}

export default connect(mapStatesToProps)(CharacterDetail)