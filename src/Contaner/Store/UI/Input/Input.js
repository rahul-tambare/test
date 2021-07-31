import React, { useState } from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    const [select, setSelect] = useState("")
    if (props.Attribut) {
        props = props.Attribut
    }
    if (props.type === "submit") {
        return <input className={classes.Submit} type='submit' disabled={props.disabled} />
    } else if (props.type === "select") {
        return (
            <select className={classes.input} value={props.value} id={props.id} onChange={props.onChange} disabled={props.disabled}>
                <option ></option>
                {props.options.map(option => {
                    console.log()
                    return <option >{option}</option>
                })}
            </select>
        )
    } else if (props.type === "checkbox") {
        return <input type={props.type} id={props.id} className={classes.checkmark} onChange={props.checkChange} defaultChecked={props.check} checked={props.check} disabled={props.disabled} />
    } else if (props.type === "number") {
        return <input type={props.type} id={props.id} value={props.value} className={classes.input} onChange={props.onChange} max={props.quantity} min={0} disabled={props.disabled} />
    } else {
        return <input type={props.type} id={props.id} value={props.value} className={classes.input} onChange={props.onChange} maxlength={props.maxlength} minlength={props.minlength} disabled={props.disabled} />

    }
}
export default Input;