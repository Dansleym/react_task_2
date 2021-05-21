import React from 'react';

export default function Buttons({ variant, text, onclick, type }) {
    return <button className={variant} onClick={onclick} type={type}>{text}</button>;
}