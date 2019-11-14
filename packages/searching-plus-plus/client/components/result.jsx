import React from 'react';

export default ({ result = {id: '', street: '??', number: '???'} }) => (
    <li className="result">
        {result.id} - {result.street} {result.number}
    </li>
);
