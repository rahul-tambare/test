import { name, surName, addCount, subCount, inputCount, item, cancleItems, removeItems } from "../Constants/Constants";
export const addName = (payload) => {
    return { type: name, payload: payload }
}
export const addSurName = (payload) => {
    return { type: surName, payload: payload }
}
export const addCountD = (id, count) => {

    return { type: addCount, payload: { id, count } }
}
export const subCountD = (id, count) => {

    return { type: subCount, payload: { id, count } }
}

export const addCountInput = (payload) => {
    return { type: inputCount, payload: payload }
}
export const items = (payload) => {
    return { type: item, payload: payload }
}
export const cancleItemss = (payload) => {
    return { type: cancleItems, payload: payload }
}
export const removeItemss = () => {
    return { type: removeItems }
}

