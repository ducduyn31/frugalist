export const cssName =
  (className: string | undefined) =>
  (previousClasses: TemplateStringsArray) => {
    return previousClasses[0] + (className ? ` ${className}` : '')
  }
