import React from "react";
import useForm from "../../UI/Form/CreateForm";
const Counter = (props) => {
    return useForm(props.form, props.values);

}
export default Counter;