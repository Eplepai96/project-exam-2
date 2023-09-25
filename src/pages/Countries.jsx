import React from 'react';
import Countries from '../api/fetchCountries';

export function RenderCountries () {
    return (
        <div className='container'>
            <Countries />
        </div>
    )
}