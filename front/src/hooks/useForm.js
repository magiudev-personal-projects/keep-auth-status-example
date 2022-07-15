import { useState } from "react"

const useForm = (initialForm = {}) => {
    const [form, setForm] = useState(initialForm);

    const onInputChange = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    } 

    return [
        form,
        onInputChange
    ]

}

export default useForm;