import React, { Fragment } from 'react';
import classes from './FormTable.css';
import Input from '../../Input/Input';

const FormTable = (props) => {
    console.log(props.s);
    const fields = props.fields;
    let fieldsInRow = props.fieldsInRow;
    if (!fieldsInRow) {
        fieldsInRow = 3;
        // console.log(fieldsInRow, 'sds');
    }
    const ArrayFields = Object.keys(fields).map(field => {
        // console.log(field);
        //field Array
        let fieldArray = Object.keys(fields[field]);// array of object name

        //subFields Input
        let subFields = fieldArray.map(subField => {
            //Attrabuts           
            let Attrabutes = { ...fields[field][subField] };
            // Attrabutes.id is define for getting value of field Like this "firstName_Student" means firstName is field of Student
            if (Attrabutes.name === undefined) {
                Attrabutes.name = subField;
            }
            if (Attrabutes.placeholder === undefined) {
                // find which alphabet is capital                
                const name = subField;
                const toUIndex = [];
                const placeholderArray = [];
                for (let i = 0; i < name.length; i++) {
                    if (name[i] == name[i].toUpperCase()) {
                        toUIndex.push(i)
                    }
                }
                for (let i = 0; i < toUIndex.length; i++) {
                    if (toUIndex.length === 1) {
                        placeholderArray.push(name.slice(0, toUIndex[0]))
                        placeholderArray.push(name.slice(toUIndex[0], name.length))
                        // console.log(toUIndex[i - 1]);
                    } else {
                        if (i === 0) {
                            // if (name[i].toUpperCase()) {
                            //     window.alert(name)
                            //     return placeholderArray.push(name.slice(0, toUIndex[1]))
                            // }
                            placeholderArray.push(name.slice(0, toUIndex[0]))
                        } else if (i === toUIndex.length - 1) {
                            placeholderArray.push(name.slice(toUIndex[i - 1], name.length))
                        } else {
                            placeholderArray.push(name.slice(toUIndex[i - 1], toUIndex[i]))
                        }
                    }
                }
                // console.log(placeholderArray, toUIndex);

                if (toUIndex.length === 0) {
                    placeholderArray.push(subField);
                }
                console.log(placeholderArray)
                for (let i = 0; i < placeholderArray.length; i++) {
                    let TitleCase = [];
                    console.log(placeholderArray[i])
                    TitleCase.push(placeholderArray[i][0].toUpperCase());
                    TitleCase.push(placeholderArray[i].slice(1, placeholderArray[i].length))
                    let TitleCase2 = TitleCase.join("");
                    placeholderArray[i] = TitleCase2;
                }
                // slice in words at which is capital
                // store in variabel 
                // pass 

                Attrabutes.placeholder = placeholderArray.join(" ");
            }
            Attrabutes.id = Attrabutes.name + '_' + field;
            // return cells values with xml
            let cell1 = (
                <td key={'td' + Attrabutes.id} className={classes.Td}>
                    <Input disabled={props.disabled} ev={props.ev} ou={props.ou} change={props.change} Attrabutes={Attrabutes} />
                </td>);
            return cell1
        })
        // each row of table has only 3 input columns        
        let headerForElement = Math.ceil(fieldArray.length / fieldsInRow);

        //create row of fields and inputs 

        let row = [];
        for (let i = 0; i <= headerForElement - 1; i++) {
            let cell2 = [];
            for (let j = i * fieldsInRow + 1; j <= (i + 1) * fieldsInRow; j++) {

                cell2.push(subFields[j - 1]);
                // console.log(subFields[j-1]);
                if (j === fieldArray.length) {
                    break;
                }
            }
            let keyId = 'tr' + i;
            // if row has field title or not 
            if (i === 0) {
                if (field === 'Documents') {
                    row.push(<tr key={keyId}>{cell2}</tr>);
                } else if (field === "health") {
                    row.push(<tr key={keyId}>{cell2}</tr>);
                } else {
                    row.push(<tr key={keyId}><td key={keyId + 'FieldTitle'} className={classes.FieldTitle} >{field}</td>{cell2}</tr>);
                }
            } else {
                if (field === 'Documents') {
                    row.push(<tr key={keyId}>{cell2}</tr>);
                } else if (field === "health") {
                    row.push(<tr key={keyId}>{cell2}</tr>);
                } else {
                    row.push(<tr key={keyId}><td key={keyId + 'NonFieldTitle'} className={classes.NonFieldTitle}></td>{cell2}</tr>);
                }
            }
        }
        // push bottom border when field finish the input fields
        row.push(<tr key={field + 'end'}><td className={classes.Border} colSpan={fieldsInRow + 1}></td></tr>);
        return (
            row
        );
    });

    let titleDisplay = classes.NonTitle;
    if (props.Title) {
        titleDisplay = classes.Title;
    }

    return (
        <Fragment>
            <thead className={titleDisplay}><div>{props.Title}</div>{props.close ? <div className={classes.close} onClick={props.closeHandeler}>&times;</div> : null}</thead>
            <tbody>
                {ArrayFields}
            </tbody>
        </Fragment>
    );
}

export default FormTable;