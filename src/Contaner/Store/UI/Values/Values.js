import React from 'react';
import axios from 'axios';
import axiosInstance from '../../../../Helper/axiosInstance';
export const Valuess = async (val) => {
    // sentUrl,postData,ValuesOf,setLoading,
    // check the Product Name if already present in the list then show in red name alreday in products and return

    let post = true;
    const retObject = {}
    console.log(val);
    // return 'sss';
    try {
        const product = await axiosInstance().get(val.sentUrl);
        console.log(product);
        if (typeof product.data === 'object' && !(product.data === undefined || product.data === null)) {
            Object.keys(product.data).forEach(el => {
                if (product.data[el][val.ValuesOf] === val.postData[val.ValuesOf]) {
                    post = false;
                    retObject.dublicateNameWorning = "product Name already exists, use diffrent name";
                }
            })
        };
        // post the product details
        if (post) {
            await axiosInstance().post(val.sentUrl, val.postData);
            if (val.ValuesOf === "SubProduct") {
                retObject.setPopupFalse = true;
                retObject.setFormPopFalse = true;
            }
            if (val.ValuesOf === 'ProductName') {
                retObject.closeHandler = true;
            }
            retObject.CloseLoading = true;
            return retObject;
        } else {
            val.setLoading(false);
            return retObject
        }
    } catch (err) {
        console.log(err);
        return 'sss';

    }
}
