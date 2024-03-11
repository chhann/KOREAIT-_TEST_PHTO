import React, { useState } from 'react';

import Component from './components/Component1/Component';
import { useRecoilState } from 'recoil';
import { inputState } from './atoms/inputState';


function GlobalState(props) {
    const [value, setValue] = useRecoilState(inputState);

    return (
        <div>
            <h1>{value}</h1>        
            <Component/>
        </div>
    );
}

export default GlobalState;