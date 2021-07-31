import React, { useState, useEffect } from 'react';
import ListTableNew from './ListTableNew';
import axios from 'axios';
import Backdrop from '../../../Component/UI/Backdrop/Backdrop';
import axiosInstance from '../../../Helper/axiosInstance';
const History = (props) => {
    const [list, setList] = useState();
    const [popupFormId, setPopupFormId] = useState(null);
    const [title, setTitle] = useState();
    useEffect(() => {
        if (popupFormId === null) {
            setPopupFormId(props.id);
            setTitle(props.name);
            getHistory()
        }
    }, [props.id]);
    const getHistory = async () => {
        try {
            const getField = await axiosInstance().get(`student/student/${props.id}/${props.field}`);
            setList(getField.data.list)
        } catch (err) {
            console.log(err);
        }
    }
    return (<>
        <ListTableNew
            TH={props.TH}
            list={list}
            id={popupFormId}
            title={title}
            close={props.setNull}
            Popup
        />
        <Backdrop show clicked={props.setNull} />
    </>

    )
}
export default History;