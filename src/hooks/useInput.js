import { useState } from "react";

export function useInput() {
    const [ value, setValue ] = useState("");

    const handleOnChange = (e) => {
        setValue(() => e.target.value);
    }

    return [ value, handleOnChange, setValue ];
}




export function useInputImg() {
    const [ files, setFiles ] = useState("");

    const handleOnChange = (e) => {
        setFiles(() => e.target.files);
    }

    return [ files, handleOnChange ];
}


export function useInputuserImg() {
    const [ files, setFiles ] = useState("");

    const handleOnChange = (e) => {
        let abc =e.target.files

        const fileArray = Array.from(abc);

        const fileReader = new FileReader();

            fileReader.onload = (e) => {

                setFiles(e.target.result)
                           
            };
            fileReader.readAsDataURL(fileArray[0]);

    }

    return [ files, handleOnChange, setFiles ];
}