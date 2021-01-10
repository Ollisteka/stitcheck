import React, { useEffect, useState } from 'react';

export const App = () => {
    const [pattern, setPattern] = useState([]);
    useEffect(() => {
        fetch('/pattern')
            .then((res) => res.json())
            .then(setPattern);
    }, []);

    return (
        <div>
            <h3>Stitcheck</h3>
            <p>Welcome to Stitcheck!</p>
            <main>
                {pattern.map((element, idx) => (
                    <button style={{ backgroundColor: element[1] }} key={idx}>
                        {element[0]}
                    </button>
                ))}
            </main>
        </div>
    );
};

export default App;
