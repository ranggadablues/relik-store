declare module '@/*' {
  const value: any
  export default value
}

declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}
