import { name, surName, addCount, subCount, inputCount, item, cancleItems, removeItems } from "../Constants/Constants";
const initialState = {
    name: [],
    surName: [],
    count: 0,
    items: {}
}

const Reducer = (state = initialState, action) => {
    if (action.type === surName) {
        return Object.assign({}, state, { surName: state.surName.concat(action.payload) });
    }
    if (action.type === name) {
        return Object.assign({}, state, { name: state.name.concat(action.payload) });
    }
    if (action.type === addCount) {
        if (state.count < 99) {
            if (!(state.items[action.payload.id].count)) {
                state.items[action.payload.id].count = 0;
            }
            return Object.assign({}, state, Object.assign({}, state.items, state.items[action.payload.id].count = state.items[action.payload.id].count >= state.items[action.payload.id].Quantity ? state.items[action.payload.id].Quantity : state.items[action.payload.id].count + action.payload.count));
        }

    }
    if (action.type === subCount) {
        if (state.count < 99) {
            return Object.assign({}, state, Object.assign({}, state.items, state.items[action.payload.id].count = state.items[action.payload.id].count ? state.items[action.payload.id].count - action.payload.count : 0));
        }

    }

    if (action.type === inputCount) {
        if (action.payload < 100) {
            return Object.assign({}, state, { count: action.payload });
        }
    }
    if (action.type === item) {
        return Object.assign({}, state, { items: Object.assign({}, state.items, action.payload) });
    }
    if (action.type === cancleItems) {
        const { [action.payload]: val, ...it } = state.items;
        console.log(val, it, '30');
        return Object.assign({}, state, { items: it });
    }
    if (action.type === removeItems) {
        return Object.assign({}, state, { items: {} });
    }
    return state;
}
export default Reducer;