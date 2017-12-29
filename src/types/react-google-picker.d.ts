declare module 'react-google-picker' {
  interface GooglePickerProps {
    clientId: string
    developerKey: string
    scope: string[]
    onChange?: (data: any) => any
    multiselect?: boolean
    navHidden: boolean
    authImmediate: boolean
    viewId: string
    createPicker?: (google: any, oauthToken: any) => any
    mimeTypes?: string[]
  }

  export default class GooglePicker extends React.Component<GooglePickerProps, {}> {}
}
