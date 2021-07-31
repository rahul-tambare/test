import React, { useState, useEffect } from 'react';
import Registration from '../Registration/Registration';
import axios from 'axios';
import Form from './Form';
import ListTableNew from './ListTableNew';
import History from './History';
import axiosInstance from '../../../Helper/axiosInstance';
const List = (props) => {
    const [list, setList] = useState()
    // const [update, setUpdate] = useState(true);
    const [popupFormId, setPopupFormId] = useState();
    const [popupFormName, setPopupFormName] = useState();
    const [popup, setPopup] = useState(false);
    const [update, setUpdate] = useState(false);
    const [history, setHistory] = useState(false);
    const [frezz, setFrezz] = useState(false);
    useEffect(() => {
        getStudentField();
        // console.log(list)
    }, [])
    const getStudentField = async () => {
        try {
            const getField = await axiosInstance().get(`student/student/${props.field}`);
            console.log(getField.data.list)
            setList(getField.data.list, 'ikk');
        } catch (error) {
            console.log(error);
        }
    }
    const updateField = (e, id) => {
        const name = list[id].name
        setPopupFormId(id)
        setPopupFormName(name);
        setUpdate(true);
        setPopup(true);
        setHistory(false);
    }
    const profileField = (e, id) => {
        const name = list[id].name
        setFrezz(true);
        setPopupFormId(id)
        setPopupFormName(name);
        setUpdate(true);
        setPopup(true);
        setHistory(false);
    }
    const historyField = (e, id) => {
        const name = list[id].name
        setPopupFormId(id)
        setPopupFormName(name);
        setUpdate(false);
        setPopup(true);
        setHistory(true);
    }
    const setNull = () => {
        setPopupFormName()
        setPopupFormId()
        getStudentField()
        setUpdate(false);
    }
    return (<div>

        {popupFormId && update && (props.field === 'Student') ? <Registration change={setNull} id={popupFormId} frezz={frezz} /> :
            <div><ListTableNew
                TH={props.TH}
                list={list}
                id={popupFormId}
                title={props.field}
                updateField={updateField}
                historyField={props.field === 'Student' ? null : historyField}
                profileField={props.field === 'Student' ? profileField : null}
            />
                {
                    popupFormId && update ? <div >
                        <Form properties={props.properties} field={props.field} id={popupFormId} name={popupFormName} change setNull={setNull} />
                    </div> : null
                }
                {
                    popupFormId && history && (props.field !== 'Student') ? <div>
                        < History TH={props.TH} field={props.field} id={popupFormId} name={popupFormName} change setNull={setNull} />
                    </div> : null
                }</div>
        }
    </div >)
}
export default List;