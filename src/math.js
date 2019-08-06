//tree shaking 我在index引入什么 打包的时候就打什么  不要全打进去  把不要的全部摇晃掉
export const add = (a,b) =>{
    console.log(a+b)
}

export const minus = (a,b) =>{
    console.log(a-b)
}