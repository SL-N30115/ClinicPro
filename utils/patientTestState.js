import { useState } from "react";

const useTestForm = ()=> {
    const [values, setValues] = useState({});

    const handleChange = (name, value) => {
        setValues({...values, [name]: value});
    };

    return {values, handleChange};
}

export default useTestForm;