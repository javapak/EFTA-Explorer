import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DiagramProvider } from '../webgpu-flow/src/components/DiagramProvider.tsx'
import globalRenderer  from '../webgpu-flow/src/renderers/gpuInstance.ts'

await globalRenderer.initialize()
await globalRenderer.initializeLabelRenderer();
await globalRenderer.initializeFloatingEdgeRenderer();

window.console.log = () => {};

createRoot(document.getElementById('root')!).render(

    <DiagramProvider>
      <App />
    </DiagramProvider>
)
