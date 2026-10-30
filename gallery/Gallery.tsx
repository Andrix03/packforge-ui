// Every component of the kit in both themes, and every icon.
import { useState } from 'react'
import {
  Button,
  Checkbox,
  Dialog,
  ICON_NAMES,
  Icon,
  IconButton,
  Panel,
  Select,
  Slider,
  Tabs,
  TextField,
  Toggle,
  applyTheme,
  type ThemeName
} from '../src'
import './gallery.css'
import { initialTheme, params } from './params'

export function Gallery(): React.JSX.Element {
  const [theme, setTheme] = useState<ThemeName>(initialTheme)
  const [toggle, setToggle] = useState(true)
  const [check, setCheck] = useState(false)
  const [distance, setDistance] = useState(6)
  const [f0, setF0] = useState(10)
  const [name, setName] = useState('oak_planks')
  const [version, setVersion] = useState('26.3')
  const [tab, setTab] = useState('color')
  const [dialog, setDialog] = useState(params.has('dialog'))
  const [query, setQuery] = useState('')
  const pick = (next: ThemeName): void => {
    applyTheme(next)
    setTheme(next)
  }
  const icons = ICON_NAMES.filter((n) => n.toLowerCase().includes(query.toLowerCase()))

  return (
    <main className="gallery">
      <header className="gallery-head">
        <h1 className="pf-label">packforge-ui</h1>
        <span className="pf-muted">I componenti di PackForge, in stile Minecraft.</span>
        <span className="gallery-spacer" />
        <Tabs
          label="Tema"
          value={theme}
          onValueChange={(v) => pick(v as ThemeName)}
          tabs={[
            { value: 'minecraft', label: 'Minecraft' },
            { value: 'pulito', label: 'Pulito' }
          ]}
        />
      </header>

      <div className="gallery-grid">
        <Panel title="Button">
          <div className="gallery-row">
            <Button variant="main" icon="save">
              Salva
            </Button>
            <Button icon="folder">Apri pack</Button>
            <Button variant="quiet">Annulla</Button>
            <Button variant="danger" icon="trash">
              Elimina
            </Button>
          </div>
          <div className="gallery-row">
            <Button disabled>Spento</Button>
            <IconButton icon="undo" label="Annulla" shortcut="Ctrl+Z" />
            <IconButton icon="redo" label="Ripeti" shortcut="Ctrl+Y" />
            <IconButton icon="compare" label="Confronta" variant="quiet" />
          </div>
        </Panel>

        <Panel title="Toggle e Checkbox">
          <Toggle
            checked={toggle}
            onCheckedChange={setToggle}
            label="Mipmap come nel gioco"
            description="Le texture lontane si sfumano come in Minecraft"
          />
          <Checkbox checked={check} onCheckedChange={setCheck} label="Sovrascrivi le mappe" />
        </Panel>

        <Panel title="Slider">
          <Slider
            label="Distanza"
            value={distance}
            onValueChange={setDistance}
            min={1}
            max={10}
            valueText={`${distance} blocchi`}
          />
          <Slider
            label="F0 (riflesso)"
            value={f0}
            onValueChange={setF0}
            max={30}
            marks={[
              { value: 5, label: 'acqua' },
              { value: 10, label: 'pietra' },
              { value: 11, label: 'vetro' },
              { value: 13, label: 'plastica' }
            ]}
          />
        </Panel>

        <Panel title="TextField e Select">
          <TextField
            label="Nome della texture"
            value={name}
            onValueChange={setName}
            mono
            {...(/^[a-z0-9_]+$/.test(name)
              ? { hint: 'Il nome del gioco, senza .png' }
              : { error: 'Solo minuscole, numeri e _' })}
          />
          <Select
            label="Versione del gioco"
            value={version}
            onValueChange={setVersion}
            options={[
              { value: '26.3', label: '26.3', hint: '97.1' },
              { value: '1.21.4', label: '1.21.4', hint: '46' },
              { value: '1.20.1', label: '1.20.1', hint: '15' }
            ]}
          />
        </Panel>

        <Panel title="Tabs e Dialog">
          <Tabs
            label="Cosa dipingi"
            value={tab}
            onValueChange={setTab}
            tabs={[
              { value: 'color', label: 'Colore' },
              { value: 'normal', label: 'Rilievo _n', dirty: true },
              { value: 'specular', label: 'Materiale _s' },
              { value: 'test', label: 'Prova', icon: 'cube' }
            ]}
          />
          <Button onClick={() => setDialog(true)}>Apri la domanda</Button>
          <Dialog
            open={dialog}
            onOpenChange={setDialog}
            kind="alert"
            title="Modifiche non salvate"
            description="stone ha modifiche non salvate."
            actions={
              <>
                <Button variant="quiet" onClick={() => setDialog(false)}>
                  Annulla
                </Button>
                <Button variant="danger" onClick={() => setDialog(false)}>
                  Chiudi senza salvare
                </Button>
                <Button variant="main" onClick={() => setDialog(false)}>
                  Salva e chiudi
                </Button>
              </>
            }
          />
        </Panel>

        <Panel title="Panel" actions={<IconButton icon="cross" label="Chiudi" variant="quiet" />}>
          <span className="pf-muted">
            Un riquadro con il titolo e i suoi controlli a destra. I pannelli dell'app sono tutti
            così.
          </span>
        </Panel>
      </div>

      <Panel title={`Icone (${ICON_NAMES.length})`}>
        <TextField label="Cerca un'icona" value={query} onValueChange={setQuery} />
        <div className="gallery-icons">
          {icons.map((icon) => (
            <div key={icon} className="gallery-icon" title={icon}>
              <Icon name={icon} size={32} />
              <span className="pf-mono">{icon}</span>
            </div>
          ))}
        </div>
      </Panel>
    </main>
  )
}
