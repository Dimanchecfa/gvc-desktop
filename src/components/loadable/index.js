import React, { Suspense } from 'react';
import MainLoader from '../loader/Main';

const MainLoadable = ({children}) => {
    return (
        <Suspense fallback={<MainLoader />}>
            {children}
        </Suspense>
    );
}

export default MainLoadable;
