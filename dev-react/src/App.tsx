import { useState } from 'react'
import {Viewer3dReact} from '../../dist/Viewer3dReact'
import { simpleObj } from './simpleObject'

const App = () => {
  const [obj, setObj] = useState(simpleObj[Math.floor(Math.random()*simpleObj.length)])
  return (
    
    <div>
      <button onClick={() => setObj(simpleObj[Math.floor(Math.random()*simpleObj.length)])}>Random Object</button>
      <Viewer3dReact 
        onClickViewer={(e) => console.log(e)}
        object={obj.url}
        texture="https://c4.wallpaperflare.com/wallpaper/37/209/81/texture-simple-dots-abstract-wallpaper-preview.jpg"
        background='./studio_small_09_4k.hdr'
      />
    </div>
  )
}

export default App
