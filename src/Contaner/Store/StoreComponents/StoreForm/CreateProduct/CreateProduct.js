import React, { useState } from 'react';
import axios from 'axios';
import useForm from '../../../UI/Form/CreateForm';
import FormTable from '../../../../../Component/UI/Table/FormTable/FormTable';
import classes from './CreateProduct.module.css';
import Position from '../../../../../Component/UI/Position/Position';
import Loader from "../../../UI/Loader/Loader";
import { Valuess } from '../../../UI/Values/Values';


const CreateProduct = (props) => {
    const [loading, setLoading] = useState(false);

    const form = {
        ProductName: { type: "text", label: "Product Name", value: "", strict: true, minlength: 4, maxlength: 10, minValue: 3 },
        SubProduct: { type: "checkbox", label: "SubProduct", check: true, disabled: true },
        EntryDate: { type: "checkbox", label: "Entry date", check: true, disabled: true },
        ExpiryDate: { type: "checkbox", label: "Expiry date", check: false },
        SelfOrDonation: { type: "checkbox", label: "Self or Donation", check: false },
        Details: { type: "checkbox", label: "Details", check: false },
        Price: { type: "checkbox", label: "Price", check: false },
        Condation: { type: "checkbox", label: "Condation", check: false },
        Quantity: { type: "checkbox", label: "Quantity", check: true, disabled: true },
    }

    const values = async (v) => {
        const formSubmit = {
            SubProduct: { type: "text", label: "SubProduct", value: "", minlength: 4, maxlength: 10, strict: true, minValue: 3 },
            EntryDate: { type: "date", label: "Entry Date", value: "" },
            ExpiryDate: { type: "date", label: "Expiry date", value: "" },
            SelfOrDonation: { type: "select", label: "Self or Donation", options: ["self", "donation"], value: "" },
            Details: { type: "text", label: "Details", value: "" },
            Price: { type: "number", label: "Price", value: "" },
            Condation: { type: "select", label: "Condation", options: ["Good", "Bad"], value: "" },
            Quantity: { type: "number", label: "Quantity", value: "", strict: true, minValue: 1 }
        }

        const form2 = {}
        const formListKeys = []
        const a = Object.keys(v).map(w => {
            formListKeys.unshift(w);
            // console.log('hi', w);
            // console.log(w, 'w')
            // if (v[w] === true) {
            //     form2[w] = formSubmit[w];
            // }
        })
        // console.log('hi', formListKeys);
        formListKeys.forEach(el => {
            if (v[el] === true) {
                form2[el] = formSubmit[el];
            }
        })
        v.form = form2;
        let dublicateNameWorning = '';
        let post = true;
        const sentValue = {
            sentUrl: "/store/createproperty",
            postData: v,
            ValuesOf: "ProductName",
            name: "product",
            setLoading
        }
        try {
            const val = await Valuess(sentValue);
            console.log(val);
            if (val.CloseLoading) {
                setLoading(false);
            }
            if (val.closeHandler) {
                if (props.closeHandler) {
                    props.closeHandler();
                }
            }
            return val;

        } catch (err) {
            console.log(err)
        }
        // console.log(form2);
        // let sss = '';
        // let post = true;
        // // check the Product Name if already present in the list then show in red name alreday in products and return 
        // try {
        //     const product = await axios.get("https://storemanagement-f0257-default-rtdb.asia-southeast1.firebasedatabase.app/pp.json")
        //     if (typeof product.data === 'object' && !(product.data === undefined || product.data === null)) {
        //         Object.keys(product.data).forEach(el => {
        //             if (product.data[el].ProductName === v.ProductName) {
        //                 post = false;
        //                 sss = "product Name already exists use diffrent name";
        //             }
        //         })
        //     };
        //     // post the product details
        //     if (post) {
        //         await axios.post("https://storemanagement-f0257-default-rtdb.asia-southeast1.firebasedatabase.app/pp.json", v)
        //         props.closeHandler();
        //         setLoading(false);
        //         // console.log(sss)   
        //         return null;
        //     } else {
        //         setLoading(false);
        //         return sss
        //     }
        // } catch (err) {
        //     console.log(err);
        // }
    }
    const productForm = useForm(form, values, "create Product", props.closeHandler);
    return <div>
        {loading ? <Loader /> : productForm}
    </div>


}
export default CreateProduct;