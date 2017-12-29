import * as React from 'react'
import { Tag, Popconfirm, Popover, AutoComplete, Radio, Button, Icon, Spin } from 'antd'
import { Position, TeamPreview, PositionLevel, UserPreview } from '../../../types'
import { Flex } from 'reflexbox'

interface PositionCellProps {
  positions: Position[]
  users: UserPreview[] | null
  onRemovePosition: (positionId: number) => any
  onAddPosition: (userId: number, level: PositionLevel) => any
}

interface PositionCellState {
  userId: number | null,
  level: PositionLevel,
  popoverVisible: boolean
}

export default class PositionCell extends React.Component<PositionCellProps, PositionCellState> {

  state = {
    userId: null,
    level: PositionLevel.member,
    popoverVisible: false
  }

  getTagColorFromLevel (level: PositionLevel) {
    switch (level) {
      case PositionLevel.member: return ''
      case PositionLevel.coLead: return 'blue'
      case PositionLevel.lead: return 'gold'
      default: return ''
    }
  }

  renderPositionTags() {
    return this.props.positions.map(position => (
      <Popconfirm
        key={position.id}
        placement="top" 
        onConfirm={() => this.props.onRemovePosition(position.id)} 
        okText="Yes" 
        cancelText="no"
        title="Remove user?"
      >
        <Tag 
          closable={true} 
          onClose={(e: Event) => e.preventDefault()}
          color={this.getTagColorFromLevel(position.level)}
        > {`${position.user.firstName} ${position.user.lastName}`}
          {position.level !== PositionLevel.member ? ` (${position.level})` : ''}
        </Tag >
      </Popconfirm>
    ))
  }

  addPosition = () => {
    const { level, userId } = this.state

    if (!level || !userId) { return }

    this.props.onAddPosition(userId, level)
    this.setState({ popoverVisible: false })
  }

  renderAddUserPopoverContent () {
    const users = this.props.users

    if (users === null) {
      return (
        <div><Spin/> Loading users...</div>
      )
    }

    const teamDataSource = users.map(v => ({
      text: `${v.firstName} ${v.lastName}`,
      value: v.id as any
    }))

    const filterOption = (inputValue: string, option: any) => (
      (option.props.children as string).indexOf(inputValue) !== -1
    )

    return (
      <div>
        <AutoComplete
          dataSource={teamDataSource}
          filterOption={filterOption}
          onSelect={(value: any) => this.setState({ userId: value })}

        />
        <br />
        <br />
        <Radio.Group 
          onChange={(event) => this.setState({ level: event.target.value as any })}
          value={this.state.level}
        >
          {
            Object.keys(PositionLevel).map(level => (
              <Radio.Button 
                value={level}
                key={level}
              >{level}
              </Radio.Button>
            ))
          }
        </Radio.Group>

        <br/>
        <br/>
        <Flex justify="space-between">
          <Button
            size="small"
            icon="check"
            type="primary"
            onClick={this.addPosition}
          />
          <Button
            size="small"
            icon="close"
            type="danger"
            onClick={() => this.setState({ popoverVisible: false })}
          />
        </Flex>
      </div>
    )
  }

render () {
    return (
      <Flex wrap={true}>
        <Popover 
          trigger="click" 
          content={this.renderAddUserPopoverContent()}
          title="Add Team to User"
          visible={this.state.popoverVisible}
        >
          <Tag
            color="green"
          >
          <a 
            onClick={() => this.setState({ popoverVisible: true })}
          > 
            <Icon type="plus"/>
            Add User
          </a>
          </Tag>
        </Popover>
        {this.renderPositionTags()}
      </Flex>
    )
  }
}
