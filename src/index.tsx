import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import ColorPicker from 'simple-color-picker';

const root = createRoot(document.getElementById('root')!)

root.render(<App />)
