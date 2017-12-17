import * as React from 'react'
import { Tag, Popconfirm } from 'antd'
import { API_DELETE_POSITION } from '../../../constants/api'
import axios from '../../../utils/axios'

interface PositionCellProps {
  positions: {
    level: 'member' | 'coLead' | 'lead'
    createDate: string
    id: number
    team: {
      createDate: string
      id: number
      name: string
      updateDate: string
    }
    teamId: number
    updateDate: string
    userId: number
  }[]

  onChange: Function
}

export default class PositionCell extends React.Component<PositionCellProps, {}> {
  onCloseTag = (positionId: number) => async () => {
    const response = await axios.delete(API_DELETE_POSITION + positionId)
    this.props.onChange()
  }

  getTagColorFromLevel = (level: 'member' | 'coLead' | 'lead') => {
    switch (level) {
      case 'member': return ''
      case 'coLead': return 'blue'
      case 'lead': return 'gold'
      default: return ''
    }
  }

  renderTags = () => {
    return this.props.positions.map(position => (
      <Popconfirm
        placement="top" 
        onConfirm={this.onCloseTag(position.id)} 
        okText="Yes" 
        cancelText="no"
        title="Remove from team?"
      >
        <Tag 
          closable={true} 
          onClose={(e: Event) => e.preventDefault()}
          color={this.getTagColorFromLevel(position.level)}
        > {position.team.name}
        </Tag >
      </Popconfirm>
    ))
  }

render () {
    return (
      <div>
        {this.renderTags()}
      </div>
    )
  }
}
