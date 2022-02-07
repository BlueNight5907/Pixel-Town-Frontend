import React, { Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Container } from '@mui/material'
function UserDashBoardLayout({children}) {
    return (
        <Fragment>
            <Header/>
                <section className='app-content'>
                    <Container maxWidth="xl">
                        {
                            children
                        }
                    </Container>
                </section>
            <Footer/>
        </Fragment>
    )
}

export default UserDashBoardLayout
