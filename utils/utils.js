import { useState } from "react";

const useDate = ()=> {
    const [date, setDate] = useState({day: "", month: "", year: ""});

    const changeDate = (type, value) => {
        setDate({...date, [type]: value});
    };

    return {date, changeDate};
}

export default useDate;