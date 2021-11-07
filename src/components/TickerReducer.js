const SAVE_TICKER = "SAVE_TICKER";

const initial_state = null

function TickerReducer(state, action) {
  if (typeof state === 'undefined') {
    state = initial_state 
  }




  if (action.type === SAVE_TICKER) {
      console.log("tr");
    return [ ...action.payload ]
  } else {
    return state
  }
}

export default TickerReducer
