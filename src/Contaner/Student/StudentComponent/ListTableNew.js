import React, { } from 'react';
import classes from './ListTableNew.module.css';
import { Scrollbars } from 'react-custom-scrollbars';

const ListTable = (props) => {
    const updateDiv = () => {
        return [classes.cent8, classes.tdd, classes.update].join(' ')
    }
    console.log(props.list)
    let Popup;
    if (props.Popup) {
        Popup = classes.Popup;
    }
    return (
        < div className={Popup} >
            <div className={classes.popupList}>
                <Scrollbars autoHeight autoHeightMin={0} autoHeightMax={400}>
                    <table className={classes.Table}>
                        <caption className={classes.Title}><div>{props.title}</div>{props.close ? <div className={classes.close} onClick={props.close}>&times;</div> : null}</caption>
                        <thead>
                        </thead>
                        <tdody>
                            <tr className={classes.Tr} key='header'>
                                {props.TH.map(el => {
                                    console.log(el);
                                    let headerClassName = [classes[el[1]], classes.upper, classes.thh].join(' ');

                                    return <th className={headerClassName}> {el[0]}</th>
                                })}
                            </tr>
                            {(props.list !== null) && (props.list !== undefined) ? Object.keys(props.list).map(tr => {

                                return <tr className={classes.Tr}>
                                    {props.TH.map(property => {
                                        let tdClassName = [classes[property[1]], classes.tdd].join(' ')
                                        console.log(props.list[tr][property[0]]);
                                        return <td className={tdClassName}>{props.list[tr][property[0]]}</td>
                                    })}
                                    {props.updateField ? <td
                                        className={updateDiv()}
                                        id={tr + '_Update'}
                                        onClick={(e) => props.updateField(e, tr)}>
                                        Update
                                    </td> : null}
                                    {props.historyField ? <td
                                        className={updateDiv()}
                                        id={tr + '_history'}
                                        onClick={(e) => props.historyField(e, tr)}>
                                        History
                                    </td> : null}
                                    {props.profileField ? <td
                                        className={updateDiv()}
                                        id={tr + '_Profile'}
                                        onClick={(e) => props.profileField(e, tr)}>
                                        Profile
                                    </td> : null}
                                </tr>
                            }) : null}
                        </tdody>
                    </table >
                </Scrollbars >
            </div >
        </div >
    )
}
export default ListTable;