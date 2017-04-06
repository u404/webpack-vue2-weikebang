import Manage from '../components/Manage';
//import UserCenter from '../components/UserCenter';

export default [
    {
        path: '/',
        component: Manage
    },
    {
        path: '/user',
        //component: resolve => require(['../components/UserCenter'],resolve)   //amd方式
        //component: resolve => System.import('../components/UserCenter')   //ES6异步加载模块
        component: resolve => {     
            require.ensure([], () => {  //webpack特殊形式，可以指定chunk的name
                resolve(require('../components/UserCenter'))
            },'usercenter');
        }
    },
    {
        path: '/class/create',
        component: resolve =>{
            require.ensure([],()=>{
                resolve(require('../components/CreateClass'))
            },'createclass');
        }
    },
    {
        path: '/test',
        component: resolve => {     
            require.ensure([], () => {  //webpack特殊形式，可以指定chunk的name
                resolve(require('../components/Test'))
            },'test');
        }
    }
]