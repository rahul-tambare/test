import React, { Fragment, useState } from 'react';
import classes from './ListTable.css';
import Backdrop from '../../Backdrop/Backdrop';
import Table from '../FormTable/FormTable';
import PopUP from '../../PopUp/PopUp';
import PopUp from '../../PopUp/PopUp';
import Registration from '../../../../Contaner/Student/Registration/Registration';
import { Route } from 'react-router-dom';
import Health from '../../PopUp/PopupInHis/InputPopup';
import HealthHistory from '../../PopUp/PopupInHis/ListHistory';

const ListTable = (props) => {

    const th = [];
    const thead = [];
    const tr = [];
    const style = [];
    if (props.th) {
        props.th.forEach(element1 => {
            // console.log(element1);
            th.push(<th key={element1[0] + 'th'} className={classes[element1[1]]}>{element1[0]}</th>)
            style.push(classes[element1[1]]);
        });
    }
    thead.push(<tr className={classes.TH}>{th}</tr>)
    let coun = 1;
    if (props.row) {
        Object.keys(props.row).forEach(element2 => {
            let id;
            const rw = props.row[element2];
            // console.log(rw,'rw');
            const td = [];
            let counter = 0;
            td.push(<td key={element2 + 'td'} className={style[0]}>{coun}</td>)
            coun++
            Object.keys(rw).forEach(element3 => {

                if (element3 === 'id') {
                    id = rw[element3];
                    console.log(element3, 'id');
                    return;
                }
                td.push(<td key={element3 + 'td'} className={style[counter]}>{rw[element3]}</td>)
                counter++;
            })
            if (props.Update) {

                if (props.page) {
                    td.push(<td> <button key={id + '_update'} onClick={(e) => props.change(id)} className={classes.Update}>Update</button></td>);
                } else {
                    td.push(<td> <button key={'update' + '_' + element2} id={'update' + '_' + element2 + "_" + rw.name} onClick={props.change} className={classes.Update}>Update</button></td>);
                }
            }
            if (props.seeProfile) {
                td.push(<td> <a key={id + '_studentprofile'} href={'studentprofile/' + id} className={classes.seeProfile}>See Profile</a></td>);

            }
            if (props.History) {
                td.push(<td> <a key={element2 + 'history'} id={'history' + '_' + element2 + "_" + rw.name} onClick={props.change} className={classes.Update}>History</a></td>)
            }
            if (props.Delete) {
                td.push(<td key={id + 'delete'} className={classes.Delete}>Delete</td>);
            }
            tr.push(<tr key={id + 'row'} className={classes.TableRow} key={element2}>{td}</tr>);
        });
    }

    return (

        <Fragment>
            <table key='table' className={classes.Table}>
                <caption key="caption" className={classes.Caption}>
                    {props.caption}
                </caption>
                <thead key='thead' className={classes.THead}>
                    {thead}
                </thead>
                <tbody key='tbody' className={classes.TableBody}>
                    {tr}
                </tbody>
            </table>
        </Fragment>


    )
}
export default ListTable;
