import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../../Helper/axiosInstance'
import classes from './StudentProfile.module.css'
const StudentProfile = (props) => {
    const [key, setKey] = useState('');
    const [form, setForm] = useState('');
    const getStudentData = async () => {
        // const prof = await axios.get(`/student/studentlist/${key}`);
        const prof = await axiosInstance.get(`student/60f27957a0ea781910e747a0/Student`);
        setForm(prof.data.list);
        console.log(prof.data.list)
    }
    useEffect(() => {
        setKey(props.key);
        getStudentData()
    }, [props.key])

    console.log(form)
    return (<div className={classes.profileCart}>
        <div className={classes.header}>Profile</div>
        <div className={classes.main}>
            <div className={classes.form}>
                {
                    form !== null ? Object.keys(form).map(key => {
                        return ((key === 'Student') || (key === 'Address') || (key === 'Guardian') || (key === 'Guardian2') || (key === 'Whitness') || (key === 'Whitness2') || (key === 'Mother') || (key === 'Father')) ?
                            (<div key={key} className={classes.attrabut}>

                                {
                                    form[key] !== null || form[key] !== undefined ? Object.keys(form[key]).map((variable, index) => {
                                        return (<>
                                            {index === 0 ? <div className={classes.attrabutHead}>{key}</div> : null}
                                            <div className={classes.valVari} key={variable + "_" + index}>
                                                <div className={classes.variable}>{variable}</div>
                                                <div className={classes.value}>{": " + form[key][variable]}</div>
                                            </div></>)
                                    }) : null
                                }
                            </div>) : (key === 'Uploaded') ? (
                                <div key={key} className={classes.attrabut}>
                                    <div className={classes.attrabutHead}>{key}</div>
                                    {
                                        form[key] !== null || form[key] !== undefined ? Object.keys(form[key]).map((variable, index) => {
                                            return (<div className={classes.valVari} key={variable + "_" + index}>
                                                <div className={classes.variable}>{variable}</div>
                                                <div ><img
                                                    className={classes.Box}
                                                    src={form[key][variable] ? `http://localhost:3000/${form[key][variable]}` : null}
                                                /></div>

                                            </div>)
                                        }) : null
                                    }
                                    <img
                                    // className={classes.Box}
                                    // src={props.value ? `http://localhost:3000/${props.value}` : null}
                                    // onClick={props.change}
                                    // onClick={(event)=>ev(event)} 
                                    // id={props.imageShowId}
                                    />
                                </div>
                            ) : null
                    }) : null


                }
                {/* <div key="" className={classes.attrabut}>
                    <div className={classes.attrabutHead}>{key}</div>
                    <div className={classes.variable}>Name:</div>
                    <div className={classes.value}>Rahul</div>
                </div> */}

            </div>
            <div className={classes.photo}>

            </div>
        </div>
    </div>)
}
export default StudentProfile;