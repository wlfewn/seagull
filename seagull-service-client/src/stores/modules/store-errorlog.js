
export const LogDeeds = {
  setLogs: 'SET_ERROR_LOG',
  getLogs: 'GET_ERROR_LOG'
}

const errorLog = {
  state: {
    logs: []
  },
  mutations: {
    [LogDeeds.setLogs]: (state, log) => {
      state.logs.push(log)
    }
  },
  getters: {
    [LogDeeds.getLogs]: (state) => {
      return state.logs
    }
  }
}

export default errorLog
