declare module 'load-script' {
  interface Options {
    async?: boolean
    attrs?: React.ScriptHTMLAttributes<{}>
    charset?: string
    text?: string
    type?: string
  }

  type Callback = (err: Error, script: HTMLScriptElement) => void
  
  function d (url: string, opts?: Options): void
  function d (url: string, cb: Callback): void
  function d (url: string, opts: Options, cb: Callback): void

  namespace d {}

  export = d
}
