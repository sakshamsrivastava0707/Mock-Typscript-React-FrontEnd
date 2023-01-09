import { FormControlLabel } from '@mui/material'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MaterialUISwitch from './components/MaterialUISwitch'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './resources/routes-constants'
import './styles/main.sass'

const ThemedComponents = ({ children }: { children: React.ReactNode }) => {
    const [isDarkTheme, toggleTheme] = useState(false)

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'auto' }} className={isDarkTheme ? 'theme-dark' : 'theme-light'}>
            <FormControlLabel
                style={{ position: 'absolute', right: '1em', top: '1em', zIndex: 2 }}
                control={<MaterialUISwitch sx={{ m: 1 }} />}
                label=""
                checked={isDarkTheme}
                onChange={(e, checked) => toggleTheme(checked)}
            />
            {children}
        </div>
    )
}

const RootComponent: React.FC = () => {
    return (
        <ThemedComponents>
            <Router>
                <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path={ROUTES.HOMEPAGE_ROUTE} element={<HomePage />} />
                </Routes>
            </Router>
        </ThemedComponents>
    )
}

export default RootComponent
