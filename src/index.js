// import '@babel/polyfill';
import React,{Component,useState,useEffect} from 'react'
import ReactDom from 'react-dom'
import ContextTest from './components/ContextTest'
import {add} from './math'

// React类负责逻辑控制 比如修改数据 -> vdom
// ReactDom 负责渲染 vdom-> dom
// babel-loader可以转换jsx 转换React.createElement()

//函数组件状态管理 useState ,useEffect
function ClockFunc() {
    //创建状态  useState返回状态和修改状态的函数所返回的数组
    const [data,setDate] = useState(new Date())
    //定时器是副作用(ajax dom操作  异步  操作)  需要用到 useEffect

    useEffect(()=>{
        const timerId = setInterval(()=>{
            setDate(new Date())
        },1000)
        //这个地方的return 就是一个释放函数  就相当于willunmount 只有组件被卸载的时候才会执行
        return ()=>{
            clearInterval(timerId)
        }
    //    参数二 就是 依赖的状态 某个值变化的时候这个函数才执行 这个例子中没有依赖 并且执行一次 放一个空[]

    },[])
    return <div>{data.toLocaleTimeString()}</div>
}

add(1,19)

// class App extends Component {
//     render() {
//         return (
//             <div>
//                 <ContextTest/>
//                 <ClockFunc/>
//             </div>
//         )
//     }
// }


// ReactDom.render(<App/>,document.getElementById('root'))
//
// const arr = [
//     new Promise(()=>{}),
//     new Promise(()=>{})
// ]
//
// arr.map(item=>{
//     console.log(item)
// })

//server-worker注册成功之后
// if('serviceWorker' in navigator){
//     window.addEventListener('load',()=>{
//         navigator.serviceWorker.register('/service-worker').then((res)=>{
//             console.log('service-worker registered')
//         }).catch((err)=>{
//             console.log('service-worker err')
//         })
//     })
// }

//高阶组件 为了提高组件复用率，可测试性，就要保证组件功能单一性 但是你需求一旦复杂  就要拓展你这个功能单一的组件
//就有了高阶组件的概念  高阶组件就是一个工厂函数 接受一个组件并且返回一个组件

