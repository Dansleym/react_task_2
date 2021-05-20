import React from 'react';

export default function Buttons({ variant, text, onclick }) {
    return <button className={variant} onClick={onclick}>{text}</button>;
}