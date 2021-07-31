import React from 'react';
import classes from './Input.css';
import InputImage from '../InputImage/InputImage';
const Input = (props) => {
    let Label = classes.Label;
    if (props.Attrabutes.value) {
        Label = classes.Labeld;
    }
    let input;
    if (props.Attrabutes.type === "checkbox") {
        input = (
            <>
                <input
                    disabled={props.disabled}
                    onChange={props.change}
                    className={classes.Input}
                    type={props.Attrabutes.type}
                    id={props.Attrabutes.id}
                    name={props.Attrabutes.Name}
                    value={props.Attrabutes.value}
                    placeholder={props.Attrabutes.placeholder}
                    key={props.Attrabutes.name + "input"}
                ></input>
                <label
                    className={classes.Labeld}
                    key={props.Attrabutes.name + "Label"}>
                    {props.Attrabutes.placeholder}

                </label>
            </>);
    } else if (props.Attrabutes.type === 'select') {
        const options = props.Attrabutes.options.map(option => {
            if (option === props.Attrabutes.value) {
                return <option key={option} id={option + "Option"} selected>{option}</option>
            }
            return <option key={option} id={option + "Option"}>{option}</option>
        })

        input = (<>
            <select
                disabled={props.disabled}
                onChange={props.change}
                key={props.Attrabutes.name}
                className={classes.Input}
                id={props.Attrabutes.id}
                name={props.Attrabutes.Name}
            >{options}
            </select>
            <label
                key={props.Attrabutes.name + "Label"}
                className={Label}>
                {props.Attrabutes.placeholder}
            </label>
        </>);
    } else if (props.Attrabutes.type === 'file') {
        input = (<InputImage disabled={props.disabled} ev={props.ev} ou={props.ou} Attrabutes={props.Attrabutes} change={props.change} />);
    } else {
        input = (
            <>
                <input
                    disabled={props.disabled}
                    onChange={props.change}
                    className={classes.Input}
                    type={props.Attrabutes.type}
                    id={props.Attrabutes.id}
                    name={props.Attrabutes.Name}
                    value={props.Attrabutes.value}
                    placeholder={props.Attrabutes.placeholder}
                    key={props.Attrabutes.name + "input"}
                ></input>
                <label
                    className={Label}
                    key={props.Attrabutes.name + "Label"}>
                    {props.Attrabutes.placeholder}

                </label>
            </>);
    }
    return input;
}
export default Input
