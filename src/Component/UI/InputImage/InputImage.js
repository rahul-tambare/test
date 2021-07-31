import React, { Fragment, useState } from 'react';
import Image from './Image/Image';
import Backdrop from '../Backdrop/Backdrop';
import classes from './InputImage.css';
import axios from 'axios';
const InputImage = (props) => {
    const changEvent = (e) => {
        props.change(e);
        let image = document.getElementById(props.Attrabutes.id);
        image.src = URL.createObjectURL(e.target.files[0]);
    }
    const imageLabelInputId = 'I_N' + props.Attrabutes.id;
    return (
        <Fragment >
            <div className={classes.Document}>
                <Backdrop show={props.Attrabutes.imagePopUp} />
                <Image
                    value={props.Attrabutes.value}
                    imageShowId={props.Attrabutes.id}
                    change={props.change}
                    imagePopUp={props.Attrabutes.imagePopUp} />
                <input
                    disabled={props.disabled}
                    key={props.Attrabutes.name + "input"}
                    type="file"
                    id={imageLabelInputId}
                    name={props.Attrabutes.name}
                    accept="image/*"
                    onChange={(e) => changEvent(e)}
                    className={classes.DocumentInputDisplayNone} />
                <label
                    disabled={props.disabled}
                    key={props.Attrabutes.name + "Label"}
                    className={classes.LabelImg}
                    htmlFor={imageLabelInputId}>
                    Select {props.Attrabutes.placeholder}
                </label>
            </div>
        </Fragment>
    );
}
export default InputImage;