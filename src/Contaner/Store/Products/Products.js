import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CreateSubProduct from '../StoreComponents/StoreForm/CreateSubProduct/CreateSubProduct';
import CreateProduct from '../StoreComponents/StoreForm/CreateProduct/CreateProduct';
import Cart from '../StoreComponents/Cart/Cart';
const Products = () => {
    const [formShow, setFormShow] = useState(false);
    const [formShow1, setFormShow1] = useState();
    const [cartShow2, setCartShow2] = useState(false);
    const [formShow2, setFormShow2] = useState(false);

    const closeHandler = (e) => {
        setFormShow(false);
        setCartShow2(false);
        setFormShow2(false)
        setFormShow1(Math.random())
    }
    console.log(formShow);
    // { link: '/student/addStudent', name: 'Add Student' }

    const showCart = () => {
        setCartShow2(!cartShow2)
        setFormShow(!formShow)
    }
    const showProductForm = () => {
        setFormShow2(!formShow2)
        setFormShow(!formShow)
    }


    return (<div>
        {
            (formShow && cartShow2) ? <Cart closeHandler={closeHandler} /> : null
        }
        {
            (formShow && formShow2) ? <CreateProduct closeHandler={closeHandler} /> : null

        }
        {
            formShow ? null : <div><div>
                <button type="button" onClick={() => showProductForm()}>
                    Add Product
                </button>
                <button onClick={() => showCart()}>
                    Cart
                </button>
            </div>< div > <CreateSubProduct onProductCreate={formShow1} /></div ></div>
        }


    </div >)
}
export default Products;