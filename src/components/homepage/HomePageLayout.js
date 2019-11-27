import React  from 'react'
import { Layout} from 'antd';
import CharacterInfoTable from './CharacterInfoTable'
import CharacterDetail from './CharacterDetail'
import '../../styles/homepage/HomePageLayout.css'
import Logo from '../../assets/logo/sympli-logo.svg'
const { Header, Content, Footer } = Layout;

function MainPage() {
  return(
    <Layout className='homepage-layout'>
      <Header className='homepage-header'><div className="logo"><img src={Logo} alt="Sympli" /></div></Header>
      <Content className='homepage-content'>
        <div className="data-table">
          <CharacterInfoTable />
          <CharacterDetail />
        </div>
      </Content>
      <Footer className='homepage-footer'>© Power by Sympli 2019</Footer>
    </Layout>
  )
}

export default MainPage