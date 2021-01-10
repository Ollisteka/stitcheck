import React, { useEffect, useState } from 'react';
import { Cell } from '../Cell';
import { Row } from '../Row';

export const App = () => {
    const [pattern, setPattern] = useState([]);
    useEffect(() => {
        fetch('/pattern/read')
            .then((res) => res.json())
            .then(setPattern);
    }, []);

    return (
        <div>
            <h3>Stitcheck</h3>
            <p>Welcome to Stitcheck!</p>
            <table>
                <tbody>
                    {pattern.map((row, rowIdx) => (
                        <Row key={rowIdx}>
                            {row.map((cell, columnIdx) => (
                                <Cell
                                    cell={cell}
                                    key={`${rowIdx}-${columnIdx}`}
                                />
                            ))}
                        </Row>
                    ))}
                </tbody>
            </table>
            <em>
                &copy; All rights fot this pattern belong to{' '}
                <a href={'https://vk.com/etrel'} rel={'noopener noreferrer'}>
                    Usova Anastasia
                </a>
            </em>
        </div>
    );
};

export default App;
