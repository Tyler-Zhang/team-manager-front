import * as React from 'react'
import { bindActionCreators, ActionCreator } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd'
import axios from '../../../utils/axios'
import { loadUsers } from '../../../store/users'
import { Authority } from '../../../types';
import { API_POST_USERS } from '../../../constants/api';

import AddUserForm from './AddUserForm'

interface AddUserModalProps {
  loadUsers: () => any
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
          <AddUserForm />
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ loadUsers }, dispatch)

export default connect(null, mapDispatchToProps)(AddUserModal)
