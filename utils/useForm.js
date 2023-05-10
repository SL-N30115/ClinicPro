import { useState } from "react";

const useForm = ()=> {
    const [values, setValues] = useState({"disabled": false, "medicalAllergies": false});

    const handleChange = (name, value) => {
        setValues({...values, [name]: value});
    };

    return {values, handleChange};
}

export default useForm;