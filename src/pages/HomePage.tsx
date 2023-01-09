import React, { useState } from 'react'
import UsersTable from '../components/UsersTable'
import styles from './styles.module.scss'
import Helmet from 'react-helmet'
import { FormControlLabel } from '@mui/material'
import MaterialUISwitch from '../components/MaterialUISwitch'

const HomePage: React.FC = () => {
    return (
        <div className={styles['container']}>
            <Helmet>
                <title>Users</title>
            </Helmet>
            <center className={styles['header']}>Users</center>
            <UsersTable />
        </div>
    )
}

export default HomePage
