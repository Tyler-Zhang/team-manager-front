import * as React from 'react'
import { bindActionCreators, ActionCreator } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd'
import axios from '../../../utils/axios'
import { RootStore } from '../../../store'
import { Authority, UserPreview } from '../../../types';
import { API_POST_USERS } from '../../../constants/api';

import AddTeamForm from './AddTeamForm'

interface AddTeamModalProps {
  usersPreview: UserPreview[]
}

interface AddTeamModalState {
  visible: boolean
}

class AddTeamModal extends React.Component<AddTeamModalProps, AddTeamModalState> {
  state = {
    visible: false
  }

  render () {
    return (
      <div>
        <Button
          icon="plus"
          onClick={() => this.setState({ visible: true })}
          type="primary"
        >Add Team 
        </Button>
        <Modal
          visible={this.state.visible}
          footer={null}
          onCancel={() => this.setState({ visible: false })}
        >
          <br/>
          <AddTeamForm users={this.props.usersPreview}/>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state: RootStore) => ({
  usersPreview: state.users.usersPreview
})

export default connect(mapStateToProps)(AddTeamModal)
