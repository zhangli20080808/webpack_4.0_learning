import React, {Component} from 'react'


// 创建Context=>获取 Provider和Consumer  Provider提供值 Consumer消费值 函数组件中通过 useContext引入上下文

// 1.创建上下文
const Context = React.createContext()
// 2.获取 Provider Consumer
const Provider = Context.Provider
const Consumer = Context.Consumer

function Child(props) {
    return (
        <div onClick={() => props.add()}>{props.counter}</div>
    )
}

export default class ContextTest extends Component {
    state = {
        counter: 0
    }

    add = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    render() {
        return (
            <Provider value={{counter: this.state.counter, add: this.add}}>
                <Consumer>
                    {value => <Child {...value}></Child>}
                </Consumer>
            </Provider>
        )
    }
}