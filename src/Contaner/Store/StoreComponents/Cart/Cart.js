import React, { useState } from 'react';
import classes from './Cart.module.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { removeItemss, addCountD, subCountD, addCountInput, cancleItemss } from '../../../../ReduxStore/Actions/AddActions';
import axios from 'axios';
import axiosInstance from '../../../../Helper/axiosInstance';
const mapStateToProps = (state) => {
    return {
        count: state.count,
        state: state,
        items: state.items
    }
}
const mapDispachToProps = (dispach) => {
    return {
        addCount: (id, count) => dispach(addCountD(id, count)),
        subCount: (id, count) => dispach(subCountD(id, count)),
        addCountInput: count => dispach(addCountInput(count)),
        cancleItem: cancleItem => dispach(cancleItemss(cancleItem)),
        removeItems: () => dispach(removeItemss())
    }
}
const Carts = (props) => {
    const items = props.state.items;
    console.log(items)
    // add dynamic data

    const [Fname, setFname] = useState("")
    const [Mname, setMname] = useState("")
    const [Lname, setLname] = useState("")
    const [validWorning, setValidWorning] = useState("")
    //onclick counter change
    //on submit data of subproduct change 
    const add = (id) => {
        // console.log('hi');
        props.addCount(id, 1);
    }
    const sub = (id) => {
        console.log('hi');
        props.subCount(id, 1);
    }
    const cancleItem = (id) => {
        props.cancleItem(id);
    }
    const submitCart = async (subValue) => {
        console.log(Fname === undefined)
        console.log(Fname === null)
        // when cart has name then cart will submit else not the popup plese enter full name 
        if ((Fname.length > 2) && (Mname.length > 2) && (Lname.length > 2) && (Object.keys(props.items).length > 0)) {
            const itemsList = Object.keys(props.items).map(item => {
                return {
                    subProductId: props.items[item]._id,
                    count: props.items[item].count
                }
            })
            const cartSub = Object.assign({},
                {
                    items: itemsList
                },
                { Fname },
                { Mname },
                { process: subValue },
                { Lname })
            // create cart in fireBase
            console.log('hi tooo')
            try {
                await axiosInstance().post(`/store/cart`, cartSub);
                setFname("")
                setMname("")
                setLname("")

            } catch (error) {
                console.log('erss')
            }
            // minus the cart itemms quentity in subproduct
            if (!(props.items === undefined || props.items === null)) {
                Object.keys(props.items).forEach(async (item) => {
                    console.log(items[item])
                    try {
                        if (subValue === 'remove') { items[item].Quantity = items[item].Quantity - items[item].count; }
                        if (subValue === 'add') { items[item].Quantity = items[item].Quantity + items[item].count; }

                        const r = await axiosInstance().put(`/store/subproduct/${items[item]._id}`, items[item]);

                    } catch (err) {
                        console.log('er')
                    }
                })
            }
            // remove the cart items from store
            props.removeItems()
            setValidWorning("")
        } else {
            setValidWorning("Plese Enter Full Name");
            if (Object.keys(props.items).length === 0) {
                setValidWorning("Plese Add Items");
            }

        }

    }
    const onchangeName = (e, chName) => {

        if (chName === "Fname") {
            setFname(e.target.value)
        };
        if (chName === "Mname") {
            setMname(e.target.value)
        }
        if (chName === "Lname") {
            setLname(e.target.value)
        }
        console.log(Fname, Lname, Mname)
    }
    return <div className={classes.main}>
        <div className={classes.cartHeader}><div className={classes.title}>cart</div>{props.closeHandler ? <div className={classes.closeHandler} onClick={() => props.closeHandler()}>&times;</div> : null}</div>
        <section className={classes.CartContainer}>
            <div className={classes.inputForm}>
                {validWorning !== null || validWorning !== undefined ? < div className={classes.warning}>{validWorning}</div> : null}
                <div>
                    <div className={classes.inputField}>
                        <label className={classes.label} for="Fname" >First Name:</label>
                        <input className={classes.input} onChange={e => onchangeName(e, 'Fname')} type="text" id='Fname' value={Fname} />
                    </div>
                    <div className={classes.inputField}>
                        <label className={classes.label} for="Mname" >Middle Name:</label>
                        <input className={classes.input} onChange={e => onchangeName(e, 'Mname')} type="text" id='Mname' value={Mname} />
                    </div>
                    <div className={classes.inputField}>
                        <label className={classes.label} for="Lnane" >Last Name:</label>
                        <input className={classes.input} onChange={e => onchangeName(e, 'Lname')} type="text" id='Lnane' value={Lname} />
                    </div>
                </div>
            </div>
            <div className={classes.cartItems}>
                <Scrollbars autoHeight autoHeightMin={0} autoHeightMax={200}>
                    {
                        items !== undefined && items !== null ? Object.keys(items).map((item, i) => {
                            return (
                                <div className={classes.cartItem}>
                                    <div className={classes.cartItemField}>{items[item].SubProduct}</div>
                                    <div className={classes.cartItemFieldCounter}>
                                        <div className={classes.btnAdd}><button onClick={() => add(item)} className={classes.btn}>+</button></div>
                                        <div className={classes.count}><input className={classes.inputCount} type='number' onChange={(e) => { props.addCountInput(parseInt(e.target.value)) }} value={items[item].count} ></input> </div>
                                        <div><button onClick={() => sub(item)} className={classes.btn}>-</button></div>
                                    </div>
                                    <div onClick={(e) => cancleItem(item)} className={classes.cartItemFieldClose}>&times;</div>
                                </div>
                            )
                        }) : null
                    }
                </Scrollbars>
            </div>
            <div className={classes.SubmitDiv}>
                <button onClick={() => submitCart('add')} className={classes.Submit}>Add To Store</button>
                <button onClick={() => submitCart('remove')} className={classes.Submit}>Remove From Store</button>
            </div>
        </section>

    </div>
}
const Cart = connect(mapStateToProps, mapDispachToProps)(Carts);
export default Cart;