import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useForm from '../../../UI/Form/CreateForm';
import Popup from '../../../UI/Popup/Popup';
import Position from '../../../../../Component/UI/Position/Position';
import classes from './CreateSubProduct.module.css';
import Counter from '../../StoreList/Counter';
import SubProductList from '../../StoreList/SubProductList/SubProductList';
import { Scrollbars } from 'react-custom-scrollbars';
import Loader from '../../../UI/Loader/Loader';
import { Valuess } from '../../../UI/Values/Values';
import axiosInstance from '../../../../../Helper/axiosInstance'
const CreateProduct = (props) => {
    const form1 = {
        SubProduct: { type: "text", label: "SubProduct", value: "" },
        EntryDate: { type: "date", label: "Entry Date", value: "" },
        ExpiryDate: { type: "date", label: "Expiry date", value: "" },
        SelfOrDonation: { type: "select", label: "Self or Donation", options: ["self", "donation"], value: "" },
        Details: { type: "text", label: "Details", value: "" },
        Price: { type: "number", label: "Price", value: "" },
        Condation: { type: "select", label: "Condation", options: ["Good", "Bad"], value: "" },
        Quantity: { type: "number", label: "Price", value: "" }
    }
    const [form, setForm] = useState(form1);
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState();
    const [isPopup, setPopup] = useState(false);
    const [title, setTitle] = useState('');
    const [idKey, setIdkey] = useState('');
    const [view, setView] = useState('');
    const [idDelete, setIdDelete] = useState('');
    const [sslist, setList] = useState(false);
    const [formPop, setFormPop] = useState(false);

    const getProduct = async () => {
        try {
            const g = await axiosInstance().get("/store/createproperty")
            setProducts(g.data);
            setLoading(false)
        } catch (e) {
            console.log(e, 'e');
            setLoading(false)
        }
    }
    useEffect(() => {
        const onChildParentDelete = [];
        if (idDelete !== "") {
            // console.log('hi')
            setLoading(true);
            axiosInstance().delete(`/store/createproperty/${idDelete}`).then((res) => {
                getProduct();
            }).catch((err) => {
                console.log(err);
            });
            axiosInstance().get(`/store/subproduct`).then((res) => {
                const cc = Object.keys(res.data).map(id => {
                    if (res.data[id].storeId === idDelete) {
                        return res.data[id]._id;
                    }
                })
                if (cc !== null) {
                    cc.forEach(id => {
                        axiosInstance().delete(`/store/subproduct/${id}`).then((res) => {
                            // console.log('data successfully deleted');
                            setPopup(false);
                            setFormPop(false);
                            setList(false);
                            setIdDelete("")
                            // setLoading(true);
                        }).catch(err => {
                            console.log('err');
                        })
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [idDelete]);
    useEffect(() => {
        setLoading(true);
        getProduct();
    }, [props.onProductCreate])
    const onclickHandler = (e, id) => {
        setLoading(true);
        setIdkey(id);
        // setForm(products[e].form);
        setTitle(products[e].ProductName);
        setPopup(true);
        setFormPop(true);
        setList(false);
        setLoading(false);
    }
    const onViewHandler = (id, productName) => {
        setView(id);
        setTitle(productName);
        setPopup(true);
        setList(true);
    }
    let list;
    if (products !== undefined) {
        list = (<div className={classes.FixTable}>
            <table className={classes.styledTable}>
                <caption>category</caption>
                <tbody>
                    <Scrollbars autoHeight autoHeightMin={0} autoHeightMax={500}>
                        {
                            products === (!null || !undefined) || (typeof products === 'object' && products !== null) ? Object.keys(products).map(id => {
                                return (<tr className={classes.ListTr} key={products[id]._id}>
                                    <td key={id + 1} >{products[id].ProductName}</td>
                                    <td key={id + 2} id={`${products[id].ProductName}_Add`} ><button onClick={() => onclickHandler(id, products[id]._id)}>Add</button></td>
                                    <td key={id + 3} onClick={() => onViewHandler(products[id]._id, products[id].ProductName)} ><button>View</button></td>
                                    <td key={id + 4} onClick={() => setIdDelete(products[id]._id)} ><button>Delete</button></td>
                                </tr>)
                            }) : <tr><td>you does not have any product</td></tr>
                        }
                    </Scrollbars>
                </tbody>

            </table>
        </div >)
    }

    const values = async (v) => {
        v.storeId = idKey;
        setLoading(true);
        let dublicateNameWorning = '';
        let post = true;
        const sentValue = {
            sentUrl: "/store/subproduct",
            postData: v,
            ValuesOf: "SubProduct",
            name: "SubProduct",
            setLoading
        }
        console.log(v);
        try {
            const val = await Valuess(sentValue);
            console.log(val);
            if (val.CloseLoading) {
                setLoading(false);
            }
            if (val.setPopupFalse) {
                setFormPop(false);
                setPopup(false)
            }
            return val;

        } catch (err) {
            console.log(err)
        }

        // check the Product Name if already present in the list then show in red name alreday in products and return 
        // try {
        //     const product = await axios.get("https://storemanagement-f0257-default-rtdb.asia-southeast1.firebasedatabase.app/aa.json")
        //     if (typeof product.data === 'object' && !(product.data === undefined || product.data === null)) {
        //         Object.keys(product.data).forEach(el => {
        //             console.log(product.data, 'ffff');
        //             if (product.data[el].SubProduct === v.SubProduct) {
        //                 console.log('ffff');
        //                 post = false;
        //                 sss = "Subproduct Name already exists use diffrent name";
        //             }
        //         })
        //     }
        //     // post the product details
        //     if (post) {
        //         await axios.post("https://storemanagement-f0257-default-rtdb.asia-southeast1.firebasedatabase.app/aa.json", v)
        //         setLoading(false);
        //         setPopup(false);
        //         setFormPop(false);
        //         // console.log(sss)   
        //         return null;
        //     } else {
        //         setLoading(false);
        //         return sss
        //     }
        // } catch (err) {
        //     console.log(err)
        // }


        setPopup(false);
        setFormPop(false);
    }
    //
    const listClose = (e) => {
        setPopup(false);
        setList(false);
        setFormPop(false);
    }
    const onClose = (e) => {
        setPopup(false);
        setFormPop(false);
        setList(false)
    }

    const OnLoading = < Loader />
    const subProductForm = useForm(form, values, "subProduct of " + title);
    const subProductView = <SubProductList parent={view} title={title} onClose={onClose} />
    return (<div>
        {loading ? OnLoading : <div className={classes.productStyle}><div className={classes.List}>{list}</div>
            {isPopup && formPop ? <div><Popup onClick={() => onClose()} >{subProductForm}</Popup></div> : null}
            {isPopup && sslist ? <div className={classes.subProductStyle}>{subProductView}</div> : null}
        </div>
        }
    </div>)
}
export default CreateProduct;