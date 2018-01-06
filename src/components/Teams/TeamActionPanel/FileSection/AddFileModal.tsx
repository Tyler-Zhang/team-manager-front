import * as React from 'react'
import { Modal, Button, Table, Input, Row, Col, Radio } from 'antd'
import * as loadScript from 'load-script'
import { GoogleDriveFile, FilePermission } from '../../../../types'

const DEVELOPER_KEY = 'AIzaSyC8k6XKgRBivYcjpulZnU5St6XfdzozbnI'
const CLIENT_ID = '943913171833-no91vjd6embk8ne274pl6qpc8423n8qd.apps.googleusercontent.com'
const SCOPE = ['https://www.googleapis.com/auth/drive']

let scriptLoadingStarted = false

export interface PickedInfo {
  token: string
  doc: GoogleDriveFile
  permission: FilePermission
}

interface AddFileModalProps {
  disabled: boolean
  title?: string
  oauthToken?: string
  onSelect: (pickedInfo: PickedInfo) => Promise<any>
  getAuthToken?: () => Promise<string> | string
}

interface AddFileModalState {
  visible: boolean
  permission: FilePermission
  doc: GoogleDriveFile | null
  loading: boolean  
}

export default class AddFileModal extends React.Component<AddFileModalProps, AddFileModalState> {
  state = {
    visible: false,
    permission: FilePermission.reader,
    doc: null,
    loading: false
  }

  private oauthToken: string

  async loadGoogleScript () {
    return new Promise((resolve, reject) => {
      loadScript('https://apis.google.com/js/api.js', err => {
        if (err) { return reject(err) }

        const gapi = (window as any).gapi
        gapi.load('picker')
        gapi.load('auth')
      })
    })
  }

  isGoogleReady () {
    return !!(window as any).gapi
  }

  isGoogleAuthReady () {
    return !!(window as any).gapi.auth
  }

  isGooglePickerReady () {
    return !!(window as any).google.picker
  }

  async componentDidMount () {
    if (!scriptLoadingStarted) {
      scriptLoadingStarted = true
      this.loadGoogleScript()
    }
  }

  authenticate (cb: Function) {
    const gapi = (window as any).gapi

    gapi.auth.authorize(
    {
      client_id: CLIENT_ID,
      scope: SCOPE,
      immediate: false
    },
    cb)
  }

  createPicker () {
    const google = (window as any).google
    if (this.oauthToken) {
        const picker = new google.picker.PickerBuilder()
          .addView(new google.picker.DocsView()
            .setIncludeFolders(true)
            .setSelectFolderEnabled(true)
            .setOwnedByMe(true)
          )
          .setOAuthToken(this.oauthToken)
          .setDeveloperKey(DEVELOPER_KEY)
          .setCallback(this.pickerCallBack)
          .build()
        picker.setVisible(true);
      }
  }

  pickerCallBack = (data: any) => {
    if (data.action === 'picked') {
      this.setState({ doc: data.docs[0], visible: true })
    }
  }

  onLaunch = async () => {
    if (this.props.oauthToken) {
      this.oauthToken = this.props.oauthToken
      this.createPicker()
    } else if (this.props.getAuthToken) {
      const maybePromise = this.props.getAuthToken()
      let token

      if (typeof maybePromise === 'string') { 
        token = maybePromise 
      } else { 
        token = await maybePromise 
      }

      this.oauthToken = token
      this.createPicker()
    } else {
      // Have to authenticate ourselves
      this.authenticate((data: any) => {
        this.oauthToken = data.access_token
        this.createPicker()
      })
    }
  }

  onConfirm = () => {
    const { doc, permission } = this.state
    const token = this.oauthToken

    if (!doc || !permission || !token) { return }

    this.setState({ loading: true })

    this.props.onSelect({ doc, permission, token })
      .then(() => this.setState({ loading: false, visible: false }))
      .catch(() => this.setState({ loading: false }))
  }

  render () {
    return (
      <div>
        <Button
          onClick={this.onLaunch}
          type="primary"
          disabled={this.props.disabled}
        > Go
        </Button>
        <Modal
          visible={this.state.visible}
          onCancel={() => this.setState({ visible: false, doc: null })}
          onOk={this.onConfirm}
          confirmLoading={this.state.loading}
        >
          <br/>
          <h2>Are you sure you want to transfer this file?</h2>
          <br/>
          <h4>Filename: {this.state.doc !== null ? (this.state.doc as any).name : ''}</h4>
          <Radio.Group 
            onChange={val => this.setState({ permission: (val.target.value as any) })}
            value={this.state.permission}
          >
            <Radio.Button value={FilePermission.reader}>{FilePermission.reader}</Radio.Button>
            <Radio.Button value={FilePermission.writer}>{FilePermission.writer}</Radio.Button>
          </Radio.Group>
        </Modal>
      </div>
    )
  }
}
