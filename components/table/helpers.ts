export const cssName =
  (...className: (string | undefined)[]) =>
  (previousClasses: TemplateStringsArray) => {
    const concatClassNames = className.filter(name => !!name).join(' ')
    return [previousClasses[0], concatClassNames].join(' ')
  }
