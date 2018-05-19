import React from 'react'
import ReactDOM from 'react-dom'
import Hello from '../components/hello'
import '../../less/login.less'

import('../components/my').then(res=>{
    const My=res.default;
    ReactDOM.render(
        <My/>,
        document.getElementById('app')
    )
})
ReactDOM.render(
    <Hello/>,
    document.getElementById('root')
)