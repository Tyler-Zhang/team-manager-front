import * as React from 'react'
import { message, List, Spin } from 'antd'
import * as loadScript from 'load-script'
import { GoogleDriveFile, File } from '../../../../types'
import { API_GET_FILE_INFO } from '../../../../constants/api'
import axios from '../../../../utils/axios'

interface TeamFileProps {
  file: File
}

interface TeamFileState {
  file: Partial<GoogleDriveFile> | null
}

class TeamFile extends React.Component<TeamFileProps, TeamFileState> {
  constructor (props: {file: File}) {
    super(props)

    this.state = {
      file: null
    }

    this.loadDriveFile(props)
  }

  loadDriveFile = async (props = this.props) => {
    const fileId = props.file.fileId
    try {
      const response = await axios.get(API_GET_FILE_INFO(fileId))
      const data = response.data
      this.setState({
        file: {
          name: data.name
        }
      })
    } catch (e) {
      message.error(`Failed to load file: ${e.message}`)
    }
  }

  componentWillReceiveProps (nextProps: TeamFileProps) {
    this.setState({ file: null })
    this.loadDriveFile(nextProps)
  }

  render () {
    if (!this.state.file) {
      return (
        <List.Item ><Spin/></List.Item>
      )
    }

    return (
      <List.Item actions={['remove']}>
        <List.Item.Meta
          title={this.state.file.name}
        />
      </List.Item>
    )
  }
}

interface TeamFilesProps {
  files: File[] | null
}

interface TeamFilesState {

}

export default class TeamFiles extends React.Component<TeamFilesProps, TeamFilesState> {
  render () {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.files}
        loading={this.props.files == null}
        renderItem={(item: any) => (
          <TeamFile file={item}/>
        )}
      />
    )
  }
}
