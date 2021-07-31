import React, { useState, useEffect } from "react";
import classes from "./SubProduct.module.css";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import Popup from "../../../UI/Popup/Popup";
import useForm from "../../../UI/Form/CreateForm";
import Counter from "../Counter";
import Position from "../../../../../Component/UI/Position/Position";
import axios from "axios";
import { items } from '../../../../../ReduxStore/Actions/AddActions';
import { connect } from 'react-redux';
import Loader from "../../../UI/Loader/Loader";
import axiosInstance from "../../../../../Helper/axiosInstance"

const mapStateToProps = (state) => {
    return {
        item: state.item
    }
}
const mapDispachToProps = (dispach) => {
    return {
        items: item => dispach(items(item)),
    }
}
const SsubProductList = (props) => {
    console.log(props)
    const [loading, setLoading] = useState(true);
    const tableHeader = ["name", "price", "quantity", "weight"];
    const [changOver, setChangeover] = useState("");
    const [F, setF] = useState({ p: { type: "number", label: "add p", value: "" } });
    const [Data, setData] = useState()
    const [isPopup, setPopup] = useState(false);
    const [title, setTitle] = useState();
    const [problum, setProblum] = useState();
    const values = async (submitForm, event) => {
        const n = parseInt(submitForm[Object.keys(submitForm)[0]]);
        console.log(event.target.value);
        const property = Object.keys(submitForm);
        const newData = { ...Data };
        await Object.keys(newData).forEach(async (id) => {

            if (newData[id].SubProduct === property[0]) {
                if (changOver === "add") {
                    newData[id].Quantity += n;
                }
                if (changOver === "remove") {
                    newData[id].Quantity -= n;
                }
                await axiosInstance().put(`/store/subproduct/${newData[id]._id}`, { ...newData[id] })
            }
        })
        setData(newData);
        setPopup(false);
    }
    const getSubProducts = async () => {
        try {
            const a = await axiosInstance().get('/store/subproduct')
            const subProductListObject = {}
            setTitle(props.title)
            if (typeof a.data === 'object' && !(a.data === undefined || a.data === null)) {
                Object.keys(a.data).forEach(id12 => {
                    if (props.parent === a.data[id12].storeId) {
                        const subProductList1 = {}
                        Object.keys(a.data[id12]).forEach(attr => {
                            if (attr === 'Quantity') {
                                return subProductList1[attr] = parseInt(a.data[id12][attr])
                            }
                            return subProductList1[attr] = a.data[id12][attr]
                        })
                        if (!subProductList1.Quantity) {
                            subProductList1.Quantity = 0;
                        }
                        subProductListObject[id12] = subProductList1;

                    } else if (!props.parent) {
                        const subProductList12 = {}
                        Object.keys(a.data[id12]).forEach(attr => {
                            if (attr === 'Quantity') {
                                return subProductList12[attr] = parseInt(a.data[id12][attr])
                            }
                            return subProductList12[attr] = a.data[id12][attr]
                        })
                        if (!subProductList12.Quantity) {
                            subProductList12.Quantity = 0;
                        }
                        subProductListObject[id12] = subProductList12;
                    }
                })
            }
            setData(subProductListObject);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setProblum('something went wrong :)')
            console.log('error', err)
        }
    }
    useEffect(() => {
        setLoading(true);
        getSubProducts()
    }, [props.parent]);
    const quantityHandeler = (e, quantity) => {
        setLoading(true);
        const a = e.target.id.split("rahulanil_");
        console.log(e.target.id);
        setChangeover(a[1]);
        setPopup(true);
        setF({ [Data[a[0]].SubProduct]: { type: "number", label: a[1] + " " + Data[a[0]].SubProduct, strict: true, minValue: 1, quantity, value: "" } });
        setLoading(false);
    }
    const AddToCart = (e) => {
        props.items({ [e.target.id]: Data[e.target.id] });
    }
    return (<div>
        {loading ? <Loader /> : <div className={classes.parentList}>
            <table className={classes.list}>
                <caption className={classes.caption} ><div className={classes.Title}>{title}</div> {props.onClose ? <div className={classes.closeLogo} onClick={() => props.onClose()}>&times;</div> : null}</caption>
                {problum ? <caption><div>{problum}</div></caption> :
                    < tbody >
                        <tr className={classes.trow}>
                            {
                                tableHeader.map((th, index) => {
                                    return <th key={index + "th"}>{th}</th>
                                })
                            }
                        </tr>
                        {
                            Data !== null && Data !== undefined ? Object.keys(Data).map((tr) => {
                                console.log(tr)
                                return (<tr key={tr + "tr"} className={classes.trow} >
                                    <td key={"SubProduct_td"}>{Data[tr].SubProduct}</td>
                                    <td key={"Price_td"}>{Data[tr].Price}</td>
                                    <td key={"Quantity_td"}>{Data[tr].Quantity}</td>
                                    <td key={"weight_td"}>{Data[tr].weight}</td>
                                    <td key="add"><button id={tr + "rahulanil_add"} onClick={(e) => quantityHandeler(e)}>Add</button></td>
                                    <td key='remove' >< button onClick={(e) => quantityHandeler(e, Data[tr].Quantity)} id={tr + "rahulanil_remove"}>Remove</button></td>
                                    <td key='AddToCart' >< button onClick={AddToCart} id={tr}>AddToCart</button></td>
                                </tr>);
                            }) : <td>you have not subproduct</td>
                        }
                    </tbody>}
            </table>

            {isPopup ? <div><Popup onClick={() => setPopup(false)} >{<Counter values={values} form={F} />}</Popup></div> : null}
        </div>
        }
    </div >)
}
const SubProductList = connect(mapStateToProps, mapDispachToProps)(SsubProductList);
export default SubProductList;