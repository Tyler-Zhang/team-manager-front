import * as React from 'react'
import { Modal, Button, Table, Input, Row, Col } from 'antd'
import * as loadScript from 'load-script'
import { GoogleDriveFile } from '../../../types'

const DEVELOPER_KEY = 'AIzaSyC8k6XKgRBivYcjpulZnU5St6XfdzozbnI'
const CLIENT_ID = '943913171833-no91vjd6embk8ne274pl6qpc8423n8qd.apps.googleusercontent.com'
const SCOPE = ['https://www.googleapis.com/auth/drive']

let scriptLoadingStarted = false

export interface PickedInfo {
  token: string
  docs: GoogleDriveFile[]
}

interface AddFileModalProps {
  disabled: boolean
  title?: string
  oauthToken?: string
  onSelect: (pickedInfo: PickedInfo) => any
}

interface AddFileModalState {
  visible: boolean
}

export default class AddFileModal extends React.Component<AddFileModalProps, AddFileModalState> {
  state = {
    visible: false,
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
      const info: PickedInfo = {
        token: this.oauthToken,
        docs: data.docs
      }

      this.props.onSelect(info)
    }
  }

  onLaunch = () => {
    if (!this.props.oauthToken) {
      // Have to authenticate ourselves
      this.authenticate((data: any) => {
        this.oauthToken = data.access_token
        this.createPicker()
      })
    } else {
      this.oauthToken = this.props.oauthToken
      this.createPicker()
    }
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
      </div>
    )
  }
}
