import React from 'react'

const Main = ({ children }) => {
    return (
        <main id='main' className='w-[100vw] h-[100vh] relative z-10 s'>
            {children}
        </main>
    )
}

export default Main
