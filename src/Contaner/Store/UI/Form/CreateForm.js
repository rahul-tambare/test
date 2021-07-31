import React, { Fragment, useState, useEffect, useReducer } from "react";
import classes from "./CreateForm.module.css";
import Input from "../Input/Input";
import Label from "../Input/Label";
import Loader from "../Loader/Loader"
const useForm = (form, values, formTitle, CloseHandler) => {
    const [loading, setLoading] = useState(true);
    const [validValue, setValidValue] = useState("")
    // console.log(form, 'form');
    const [change, setChange] = useState(0);
    const [state, setState] = useState({});
    // setLoading(false);
    useEffect(() => {
        setState(form);
        setLoading(false)

    }, [JSON.stringify(form)]);
    const handledSubmit = (event) => {
        // console.log('ggg');
        const valuesSubmit1234 = [true];
        event.preventDefault();
        const submitForm = {};

        // submit Function
        const ifValid = async () => {

            try {
                const hi = await values(submitForm, event);

                if (!(hi.hasOwnProperty('dublicateNameWorning'))) {
                    const resetState = { ...state }
                    Object.keys(state).forEach((property, index) => {
                        if (!resetState[property].disabled) {
                            // console.alert('hi');
                            if ("check" in resetState[property]) {
                                return resetState[property].check = false;
                            }
                            if ('value' in resetState[property]) {
                                return resetState[property].value = '';
                            }
                        }
                        setValidValue()
                    });
                    setState(resetState);
                } else if (hi.hasOwnProperty('dublicateNameWorning')) {
                    setValidValue(hi.dublicateNameWorning);
                } else {
                    setValidValue('something Went wrong');
                }
            } catch (err) { console.log(err) }
        }
        // validation Function
        // non validation
        Object.keys(state).forEach(property => {
            if ("check" in state[property]) {
                // console.log("check")
                return submitForm[property] = state[property].check;
            }
            if (state[property].strict) {
                if (state[property].value.trim().length >= state[property].minValue) {
                    valuesSubmit1234.push(true);
                    // console.log(state[property])
                    return submitForm[property] = state[property].value;
                } else {
                    valuesSubmit1234.push(false);
                    setValidValue(`${state[property].label} is not valid Please cuntain at list ${state[property].minValue} charectors`);
                    console.error('gjj')
                    return
                }
            }
            return submitForm[property] = state[property].value;
        });
        if (valuesSubmit1234.includes(false)) {

        } else {
            // console.log(valuesSubmit1234.length)
            ifValid()
        }
        // console.log(validValue);
    }

    const onchangeHandeler = (e) => {
        let newState = { ...state }
        const newAttrabute = newState[e.target.id];
        // console.log(e.target.id, "newAttrabute")
        if ("value" in newAttrabute) {
            const newValue = e.target.value;
            newAttrabute.value = newValue;
        }
        if (newAttrabute.hasOwnProperty("check")) {
            const newCheck = !newAttrabute.check;
            newAttrabute.check = newCheck;
        }
        newState[e.target.id] = newAttrabute;
        setState(newState);
    }

    const tester = [];
    // console.log(state)
    if (state === undefined) {


    } else {
        Object.keys(state).forEach((title, index) => {
            const Attribut = state[title];
            // console.log(title)
            Attribut.id = title;
            Attribut.checkChange = (e) => onchangeHandeler(e);
            Attribut.onChange = (e) => onchangeHandeler(e);
            // console.log(Attribut);
            if (index % 2 === 0) {
                tester.push([Attribut]);
            } else {
                let l = tester.length - 1
                tester[l].push(Attribut);
            }
            // console.log(tester);
        })
    }

    // console.log(CloseHandler ? 'ram' : "shyam");

    return (<div className={classes.inputField}>{loading ? <Loader /> :
        <form onSubmit={handledSubmit}>
            <table className={classes.Table}>
                <caption className={classes.Title}>{CloseHandler ? <div onClick={(e) => CloseHandler(e)} style={{ float: "right" }} className={classes.Close}>&times;</div> : null}<div style={{ float: "Center" }}>{formTitle}</div></caption>
                <caption>{validValue !== "" ? <div className={classes.NotValid}>{validValue}</div> : null}</caption>
                <tbody>
                    {/* <tr><td><h1>{validValue}</h1></td></tr> */}
                    {
                        tester.map(tr => {
                            // console.log(tr);
                            return <tr className={classes.Attrabut}>{tr.map(td => {
                                return <>
                                    <td className={classes.td1}>
                                        <Label id={td.id} label={td.label} />
                                    </td>
                                    <td className={classes.td2}>
                                        < Input Attribut={td} />
                                    </td>
                                    {tr[tr.length - 1] === td ? null : <td className={classes.td3}></td>}
                                </>
                            })}</tr>
                        })
                    }
                    <tr ><td  ><Input type="submit" /></td></tr>

                    {/* {
                            Object.keys(state).map((title, index) => {
                                const Attribut = state[title];
                                // console.log(title)
                                Attribut.id = title;
                                Attribut.checkChange = (e) => onchangeHandeler(e);
                                Attribut.onChange = (e) => onchangeHandeler(e);
                                return (
                                    <Fragment>
                                        <tr className={classes.Attrabut}>
                                            <td>
                                                <Label label={Attribut.label} />
                                            </td>
                                            <td>
                                                < Input Attribut={Attribut} />
                                            </td>
                                        </tr>
                                    </Fragment>

                                )

                            })

                        } */}

                </tbody>


            </table>
        </form>
    } </div >
    )
}
export default useForm;