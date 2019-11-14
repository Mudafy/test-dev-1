import React from 'react';
import Result from './result.jsx';

export default ({ results = [] }) => (
    <div className="resultbox">
        <h2>Results:</h2>
        <ul>
            {
                results.map((result, index) =>
                    (<Result result={result} key={index} />))
            }
        </ul>
    </div>
);
