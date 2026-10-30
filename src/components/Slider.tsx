// A slider in steps, drawn as the game's segmented bar, with its value shown and optional typical
// values under it that set the slider when clicked (LabPBR F0: water 5, stone 10…). Base UI Slider
// underneath: arrows, Page Up/Down, Home/End and dragging all work.
import { Slider as BaseSlider } from '@base-ui/react/slider'
import { useId } from 'react'
import { markRows, segmentCount } from './segments'
import './Slider.css'

export interface SliderMark {
  value: number
  label: string
}

export interface SliderProps {
  label: React.ReactNode
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  /** The value as shown at the right of the label (default: the number). */
  valueText?: string
  marks?: readonly SliderMark[]
  disabled?: boolean
}

export function Slider({
  label,
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  valueText,
  marks = [],
  disabled = false
}: SliderProps): React.JSX.Element {
  const id = useId()
  const percent = (v: number): number => ((v - min) / (max - min)) * 100
  const rows = markRows(marks.map((m) => percent(m.value)))
  return (
    <div className="pf-slider">
      <div className="pf-slider-head">
        <span id={id}>{label}</span>
        <span className="pf-mono">{valueText ?? value}</span>
      </div>
      <BaseSlider.Root
        aria-labelledby={id}
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onValueChange={(next) => onValueChange(next)}
      >
        <BaseSlider.Control className="pf-slider-control">
          <BaseSlider.Track
            className="pf-slider-track"
            style={{ '--pf-segments': segmentCount(min, max, step) } as React.CSSProperties}
          >
            <BaseSlider.Indicator className="pf-slider-indicator" />
            <BaseSlider.Thumb className="pf-slider-thumb" />
          </BaseSlider.Track>
        </BaseSlider.Control>
      </BaseSlider.Root>
      {marks.length > 0 && (
        <div className="pf-slider-marks" style={{ height: `${20 + 16 * Math.max(0, ...rows)}px` }}>
          {marks.map((mark, i) => (
            <button
              key={mark.value}
              type="button"
              className="pf-slider-mark"
              style={
                {
                  left: `${percent(mark.value)}%`,
                  '--pf-mark-row': rows[i] ?? 0
                } as React.CSSProperties
              }
              disabled={disabled}
              onClick={() => onValueChange(mark.value)}
            >
              {mark.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
