export const getSteps = async () => {
  return {
    steps: [
      { key: 'add-bills', path: 'bills' },
      { key: 'add-people', path: 'people' },
      { key: 'edit-calendar', path: 'calendar' },
      { key: 'calculate', path: 'result' },
    ],
    currentStep: 0,
  }
}
