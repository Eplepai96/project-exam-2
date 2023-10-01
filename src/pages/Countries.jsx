import React from 'react';
import Countries from '../api/fetchCountries';

export function RenderCountries () {
    return (
        <body className='container'>
            <Countries />
        </body>
    )
}