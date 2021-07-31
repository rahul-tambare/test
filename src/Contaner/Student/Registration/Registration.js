import React, { Component, useState, useEffect } from 'react';
import Table from '../../../Component/UI/Table/FormTable/FormTable';
import classes from './Registration.css';
import Position from '../../../Component/UI/Position/Position';
import axios from 'axios';
import axiosInstance from '../../../Helper/axiosInstance';
import FormData from 'form-data';

const StudentRegistration = (props) => {
    // in state element has same name as it's field name like firstName then name : 'firstName'.

    const inputType = (type, options) => {
        if (type === 'file') {
            return {
                load: null,
                value: null,
                type,
                accept: "image/*",
                imagePopUp: false
            }
        }
        if (type === 'select') {
            return {
                type,
                options,
                value: ''
            }
        }
        return {
            type,
            value: ''
        }
    }

    const initialState = {
        Form: {
            Student: {
                firstName: inputType("text"),
                fatherName: inputType("text"),
                lastName: inputType("text"),
                motherName: inputType("text"),
                bloodGroup: inputType('select', ["SELECT", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
                gender: inputType('select', ["SELECT", "Male", "Female"]),
                height: inputType("number"),
                weight: inputType('number'),
                adhaarNo: inputType('number'),
                remark: inputType('text'),
                reference: inputType('text'),
                caste: inputType('text'),
                orphanCategory: inputType('select', ["SELECT", "Economically Orphan", "Maternal Orphan", "Paternal Orphan", "Double Orphan"]),
                dateOfBirth: inputType('date'),
                admitDate: inputType('date'),
                class: inputType('number'),
            },
            Address: {
                homeNo: inputType('text'),
                village: inputType('text'),
                post: inputType('text'),
                tehsil: inputType('text'),
                dist: inputType('text'),
                state: inputType('text'),
                pin: inputType('number')
            },
            Guardian: {
                name: inputType('text'),
                relition: inputType('text'),
                address: inputType('text'),
                mobile: inputType('number'),
                addharNo: inputType('number')
            },
            Guardian2: {
                name: inputType('text'),
                relition: inputType('text'),
                address: inputType('text'),
                mobile: inputType('number'),
                addharNo: inputType('text')
            },
            Whitness: {
                name: inputType('text'),
                relition: inputType('text'),
                address: inputType('text'),
                mobile: inputType('number'),
                addharNo: inputType('number')
            },
            Whitness2: {
                name: inputType('text'),
                relition: inputType('text'),
                address: inputType('text'),
                mobile: inputType('number'),
                addharNo: inputType('number')
            }
        },
        Documents: {
            Documents: {
                passPhoto: inputType('file'),
                adharCard: inputType('file'),
                residentLivingCertificate: inputType('file')
            }
        },
        isUpdate: false
    };
    const [state, setState] = useState(initialState);
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        studentUpdate(props.id, props.frezz);
    }, [props.id])

    const studentUpdate = async (id, frezz) => {
        if (frezz) {
            setDisabled(props.frezz);
        }
        if (id) {
            try {
                const updatedForm = await axiosInstance().get(`student/student/${id}/Student`);
                const list = updatedForm.data.list;

                const newState = { ...state };
                console.log(list, 'hi');
                Object.keys(newState.Form).forEach((el) => {
                    console.log(el, 'hi');
                    Object.keys(newState.Form[el]).forEach(el2 => {
                        console.log(list[el][el2])
                        newState.Form[el][el2].value = list[el][el2];
                    });
                });
                Object.keys(list).forEach((el) => {
                    if (el === 'Uploaded') {
                        Object.keys(newState.Documents.Documents).forEach(el2 => {
                            newState.Documents.Documents[el2].value = list.Uploaded[el2];
                        });
                    }
                });
                setState(newState);
                console.log(state);
            } catch (err) { }
        }
    }
    const onChangeHandeller = async (event, Category) => {

        let id = event.target.id;
        if (id.substring(0, 3) === "I_N") {
            id = event.target.id.substring(3);
        }

        const nameAndField = id.split("_");
        const newState = { ...state };
        const newCategory = { ...newState[Category] }//form document
        const newField = { ...newCategory[nameAndField[1]] };//student address adhaar
        const subField = { ...newField[nameAndField[0]] };//name age 
        if (Category === 'Documents') {
            if (event.target.files[0]) {
                subField.load = event.target.files[0];
                if (subField.value) {
                    if (!newState.deletefile) {
                        newState.deletefile = {}
                    }
                    const name = Object.keys(newField)
                    // console.log(nameAndField);
                    newState.deletefile[nameAndField[0]] = subField.value;
                }
                subField.value = null;
            }
        } else {
            subField.value = event.target.value;
            if (Category === 'Form') {
                if (nameAndField[1] === 'Student') {
                    if (nameAndField[0] === 'orphanCategory') {
                        let parent;
                        const fatherPastInfo = {
                            fatherName: inputType('text'),
                            dateOfDeath: inputType('date')
                        };
                        const fatherDeathCertificate = inputType('file');
                        const motherPastInfo = {
                            motherName: inputType('text'),
                            dateOfDeath: inputType('date')
                        };
                        const motherDeathCertificate = inputType('file');
                        // "Economically Orphan","Maternal Orphan","Paternal Orphan","Double Orphan"
                        if (subField.value === "Maternal Orphan") {
                            parent = 'mother';
                            newCategory[parent] = motherPastInfo;
                            newState.Documents.Documents["motherDeathCertificate"] = { ...motherDeathCertificate };
                            if (newCategory.father) {
                                delete newCategory.father;
                                delete newState.Documents.Documents.fatherDeathCertificate;

                            }
                        } else if (subField.value === "Paternal Orphan") {
                            parent = 'father';
                            newCategory[parent] = fatherPastInfo;
                            newState.Documents.Documents["fatherDeathCertificate"] = { ...fatherDeathCertificate };
                            if (newCategory.mother) {
                                delete newCategory.mother;
                                delete newState.Documents.Documents.motherDeathCertificate;
                            }
                        } else if (subField.value === "Double Orphan") {
                            if (newCategory.mother) {
                                delete newCategory.mother;
                                delete newState.Documents.Documents.motherDeathCertificate;
                            }
                            if (newCategory.father) {
                                delete newCategory.father;
                                delete newState.Documents.Documents.fatherDeathCertificate;
                            }
                            newCategory["mother"] = motherPastInfo;
                            newCategory["father"] = fatherPastInfo;
                            newState.Documents.Documents["fatherDeathCertificate"] = { ...fatherDeathCertificate };
                            newState.Documents.Documents["motherDeathCertificate"] = { ...motherDeathCertificate };
                        } else {
                            if (newCategory.father) {
                                delete newCategory.father;
                                delete newState.Documents.Documents.fatherDeathCertificate;
                            }
                            if (newCategory.mother) {
                                delete newCategory.mother;
                                delete newState.Documents.Documents.motherDeathCertificate;
                            }
                        }
                    }
                }
            }
        }
        newField[nameAndField[0]] = subField;
        newCategory[nameAndField[1]] = newField;
        newState[Category] = newCategory;
        setState({ ...newState });
    }
    const OnSubmit = event => {
        event.preventDefault();
        if (props.change) {
            props.change();
        }
        console.log(state);
        const formToSubmit = {}
        const Form = {
            // Student: {},
            // Documents: {}
        }
        Object.keys(state.Form).forEach((el) => {
            Form[el] = {}
            Object.keys(state.Form[el]).forEach((el2) => {
                Form[el][el2] = {}
                Form[el][el2] = state.Form[el][el2].value;
            })
        })
        if (props.id) {
            Form.id = props.id;
            Form.document = {}
            Object.keys(state.Documents.Documents).forEach((doc) => {
                if ((state.Documents.Documents[doc].value !== null) && (state.Documents.Documents[doc].value !== undefined)) {
                    Form.document[doc] = state.Documents.Documents[doc].value;
                }
            })

            if (state.deletefile) {
                Form.deletefile = {}
                console.log(state.deletefile);
                Form.deletefile = state.deletefile;
            }
        }
        const formData = new FormData();
        Object.keys(state.Documents.Documents).forEach((el) => {
            formData.append(el, state.Documents.Documents[el].load);
        })
        formData.append('Form', JSON.stringify(Form));
        formData.getAll('file');
        const t = File
        console.log(formData)
        if (props.id) {
            axiosInstance().put(`/student/studentlist/${props.id}`, formData)
        } else {
            axiosInstance().post('/student/addstudent', formData)
        }
    }
    const documentChangeHandeler = (event) => {
        onChangeHandeller(event, "Documents");
    }
    return (<React.Fragment >
        <form onSubmit={OnSubmit} className={classes.Form} >
            <table className={classes.Table}>
                <Table Title={"Student List"} fields={state.Form} disabled={disabled} ss={state} fieldsInRow='3' change={(event) => onChangeHandeller(event, "Form")} />
                <Table fields={state.Documents} fieldsInRow='3' disabled={disabled} change={documentChangeHandeler} ev={state.ev} ou={state.ou} />
                {disabled ? null : <tr> <td><input type='submit' id='submit' className={classes.Submit} /></td></tr>}
                {props.change ? <tr> <td><button onClick={props.change} className={classes.Submit} >Close</button></td></tr> : null}
            </table>
        </form>
    </React.Fragment >
    );


}
export default StudentRegistration;