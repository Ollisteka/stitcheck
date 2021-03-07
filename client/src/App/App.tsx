import React, { FC, useState, useCallback } from 'react';

import { PatternPage } from '../PatternPage';
import { SelectFile } from '../SelectFile';


enum Pages {
    SelectFile,
    PatternPage
}

export const App: FC  = () => {
    const [currentPage, setPage] = useState<Pages>(Pages.SelectFile);
    const [pattern, setPattern] = useState([]);
    const onFileUpload = useCallback((data) => {
        setPage(Pages.PatternPage);
        setPattern(data);
    }, []);
    return (
        <div>
            <h3>Stitcheck</h3>
            {currentPage === Pages.SelectFile && (
                <SelectFile onFileUpload={onFileUpload} />
            )}
            {currentPage === Pages.PatternPage && (
                <PatternPage pattern={pattern} />
            )}
        </div>
    );
};

export default App;
