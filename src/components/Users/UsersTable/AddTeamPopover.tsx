import * as React from 'react'
import { connect } from 'react-redux'
import { Popover } from 'antd'
import { RootStore } from '../../../store'
import axios from '../../../utils/axios'

interface AddTeamPopoverProps {
  teams: any[]
}

class AddTeamPopover extends React.Component<AddTeamPopoverProps, {}> {
  renderContent = () => {

  }

  render () {
    return (
      <Popover placement="top" title="Add Team" content={this.renderContent}>
        {this.props.children}
      </Popover>
    )
  }
}
