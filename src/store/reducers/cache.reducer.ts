import { ICacheAction, ICacheState } from "../../models/cache.model";

const initialState: ICacheState = {
  cache: {},
  timestamps: {},
};

export const cacheReducer = (
  state = initialState,
  action: ICacheAction
): ICacheState => {
  switch (action.type) {
    case "SET_CACHE":
      return {
        ...state,
        cache: { ...state.cache, [action.payload.query]: action.payload.data },
        timestamps: { ...state.timestamps, [action.payload.query]: Date.now() },
      };
    default:
      return state;
  }
};
