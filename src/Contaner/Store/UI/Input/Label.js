import React from 'react';
import useTitleCase from '../TitleCase/TitleCase';
import Classes from './Label.module.css';
const Label = (props) => {
    const label = useTitleCase(props.label)
    return (<label for={props.id} className={Classes.label}>{label}:</label>);
}
export default Label;