import React, { useState, useEffect } from 'react';

import { Row } from './Row';
import { Cell } from './Cell';

export const PatternPage = () => {
    const [pattern, setPattern] = useState([]);
    useEffect(() => {
        fetch('/pattern/read')
            .then((res) => res.json())
            .then(setPattern);
    }, []);

    return (
        <>
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
        </>
    );
};
