import { UPDATE_MESSAGE } from '../actions/core.actions'

export const message = (state = {}, action) => {
  let { message } = action;

  switch(action.type) {
    case UPDATE_MESSAGE:
      return {
          text: message
      } 
    default: 
      return state;
  }
}