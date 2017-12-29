import * as React from 'react'
import { Layout, Button, Input, Row, Col, Card } from 'antd'
import { bindActionCreators } from 'redux'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import { loadTeams, changeQuery } from '../../store/teams'

import TeamsTable from './TeamsTable'
import AddTeamModal from './AddTeamModal'
import TeamActionPanel from './TeamActionPanel'
import { Flex } from 'reflexbox';
import { ApiFindQuery, Team } from '../../types/index';

const { Header, Footer, Sider, Content } = Layout

interface TeamsPageProps {
  loadTeams: () => any
  changeQuery: (query: Partial<ApiFindQuery<Team>>) => any
}

class TeamsPage extends React.Component<TeamsPageProps, {}> {
  componentDidMount () {
    this.props.loadTeams()
  }

  onSearch = (q: string) => {
    this.props.changeQuery({ q })
    this.props.loadTeams()
  }
  
  render () {
    return (
      <Layout>
        <Header style={{ background: '#fff'}}>
          <Row>
            <Col span={4}><h3> Teams Page </h3></Col>
            <Col span={8}>
              <Input.Search
                  placeholder="Search here"
                  onSearch={this.onSearch}
                  enterButton={true}
              />
            </Col>
            <Col span={4} offset={8}>
              <Flex align="center" justify="flex-end">
                <Button type="dashed" icon="reload" onClick={this.props.loadTeams}/>
                <div style={{width: 10}}/>
                <AddTeamModal/>
              </Flex>
            </Col>
          </Row>
        </Header>
        <Content>
          <Row>
            <Col span={14}>
              <TeamsTable/>
            </Col>
            <Col span={10} style={{ padding: 10 }}>
              <TeamActionPanel/>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<{}>) => bindActionCreators(
  {
    loadTeams,
    changeQuery
  }, 
  dispatch)

export default connect(null, mapDispatchToProps)(TeamsPage)
