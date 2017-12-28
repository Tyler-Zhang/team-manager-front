import * as React from 'react'
import { bindActionCreators, ActionCreator } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd'
import axios from '../../../utils/axios'
import { RootStore } from '../../../store'
import { Authority, TeamPreview } from '../../../types';
import { API_POST_USERS } from '../../../constants/api';

import AddUserForm from './AddUserForm'

interface AddUserModalProps {
  teamsPreview: TeamPreview[]
}

interface AddUserModalState {
  visible: boolean
}

class AddUserModal extends React.Component<AddUserModalProps, AddUserModalState> {
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
        >Add User 
        </Button>
        <Modal
          visible={this.state.visible}
          footer={null}
          onCancel={() => this.setState({ visible: false })}
        >
          <br/>
          <AddUserForm teams={this.props.teamsPreview}/>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state: RootStore) => ({
  teamsPreview: state.teams.preview
})

export default connect(mapStateToProps)(AddUserModal)
