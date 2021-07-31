import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../../../Component/UI/Table/FormTable/FormTable';
import classes from '../StudentComponent/Form.module.css';
import Baackdrop from '../../../Component/UI/Backdrop/Backdrop';
import axiosInstance from '../../../Helper/axiosInstance';
const Form = (props) => {
    const initialForm = {
        properties: JSON.parse(JSON.stringify(props.properties))
    }
    const [form, setForm] = useState(initialForm);
    const onChangeHandeller = (event, Category) => {
        event.preventDefault();
        let id = event.target.id;
        const nameAndField = id.split("_");
        const newState = { ...form };
        const newCategory = { ...newState[Category] }//form document        
        newCategory[nameAndField[0]].value = event.target.value;
        newState[Category] = newCategory;
        setForm({ ...newState });
    }
    const closeHandler = () => {
        props.setNull()
    }
    const OnSubmit = async (event) => {
        event.preventDefault();
        console.log(form)
        const submitForm = {}
        Object.keys(form.properties).forEach((key) => {
            submitForm[key] = form.properties[key].value;
        })
        submitForm['studentId'] = props.id;
        try {
            await axiosInstance().post(`/student/add${props.field}`, submitForm);
            closeHandler();
            setForm(initialForm);
        } catch (err) {
            console.log(err)
        }
    }
    return (<>{props.id ? <>
        < div className={classes.Popup} >
            <form onSubmit={OnSubmit} className={classes.Form}  >
                <table className={classes.Table}>
                    <Table
                        Title={props.name}
                        close={() => props.setNull()}
                        closeHandeler={closeHandler}
                        fields={form}
                        fieldsInRow='3'
                        change={(event) => onChangeHandeller(event, 'properties')} />
                    <tr> <td><input type='submit' id='submit' className={classes.Submit} /></td></tr>
                    {props.change ? <tr>
                        <td>
                            <button
                                onClick={closeHandler}
                                className={classes.Submit} >
                                Close
                            </button>
                        </td>
                    </tr>
                        : null}
                </table>
            </form>
        </div >
        <Baackdrop clicked={closeHandler} change show />
    </ > : null}</>)
}
export default Form;