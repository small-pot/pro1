import ReactDOM from 'react-dom'
import React from 'react'
import My from '../components/my'
import '../../less/my.css'

setTimeout(()=>{
    import('../components/world').then(res=>{
        const World=res.default;
        ReactDOM.render(
            <World/>,
            document.getElementById('app')
        )
    })
},4000)
ReactDOM.render(
    <My/>,
    document.getElementById('root')
)
