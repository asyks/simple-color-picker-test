import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ColorPicker from 'simple-color-picker';

type RGBAColor = {
  r: number
  g: number
  b: number
  a?: number
}

function hexStringToNumber(color: string): number {
  return parseInt(color.replace('#', ''), 16)
}

function pad2(c: string): string {
  return c.length == 1 ? '0' + c : '' + c
}

function hexNumberToRgb(color: number): RGBAColor {
  const r = ((color >> 16) & 255) / 255
  const g = ((color >> 8) & 255) / 255
  const b = (color & 255) / 255
  return { r, g, b }
}

function rgbToHex(color: RGBAColor): string {
  console.log(color)
  const { r, g, b } = color
  var hex = [
    '#',
    pad2(Math.round(r * 255).toString(16)),
    pad2(Math.round(g * 255).toString(16)),
    pad2(Math.round(b * 255).toString(16))
  ]
  console.log(hex)

  return hex.join('').toUpperCase()
}


const App: React.FC = () => {
  const [colorHex, setColorHex] = useState('#ffffff')
  const [colorRed, setColorRed] = useState(0.00)
  const [colorGreen, setColorGreen] = useState(0.00)
  const [colorBlue, setColorBlue] = useState(0.00)

  const colorPicker = useMemo(() => new ColorPicker({
    el: document.getElementById('color-picker')!,
    color: '#123456',
    background: '#656565'
  }), []) 

  const setColorHexCallback = useCallback((hexStringColor: string) => {
    setColorHex(hexStringColor)
  }, [setColorHex])

  colorPicker.onChange(setColorHexCallback)

  useEffect(() => {
    document.body.style.background = colorHex
    const rgb = hexNumberToRgb(hexStringToNumber(colorHex))
    console.log(rgb)
    setColorRed(rgb.r)
    setColorGreen(rgb.g)
    setColorBlue(rgb.b)

  },[colorHex])

  const setColorRedCallback = useCallback((colorNum: number) => {
    setColorRed(colorNum)
    const hex = rgbToHex({r: colorNum, g: colorGreen, b: colorBlue})
    colorPicker.setColor(hex)
    setColorHex(hex)
  }, [colorGreen, colorBlue])

  const setColorGreenCallback = useCallback((colorNum: number) => {
    setColorGreen(colorNum)
    const hex = rgbToHex({r: colorRed, g: colorNum, b: colorBlue})
    colorPicker.setColor(hex)
    setColorHex(hex)
  }, [colorRed, colorBlue])

  const setColorBlueCallback = useCallback((colorNum: number) => {
    setColorBlue(colorNum)
    const hex = rgbToHex({r: colorRed, g: colorGreen, b: colorNum})
    colorPicker.setColor(hex)
    setColorHex(hex)
  }, [colorRed, colorGreen])

  return (
    <div>
      <header>
        Pick a Color
      </header>
      <label>r:</label>
      <input type="number" step="0.0001" min="0.00" max="1.00" value={colorRed} onChange={
        (e) => e.target.value && setColorRedCallback(parseInt(e.target.value))
      }/>
      <label>g:</label>
      <input type="number" step="0.0001" min="0.00" max="1.00" value={colorGreen} onChange={
        (e) => e.target.value && setColorGreenCallback(parseInt(e.target.value))
      }/>
      <label>b:</label>
      <input type="number" step="0.0001" min="0.00" max="1.00" value={colorBlue} onChange={
        (e) => e.target.value && setColorBlueCallback(parseInt(e.target.value))
      }/>
    </div>
  );
}

export default App
