import React, {  useState,useEffect    } from 'react';
import { Redirect } from 'react-router-dom';
import {setLogin} from '../../store/loginData'
import {useSelector,useDispatch  } from 'react-redux'
import Cookies from "js-cookie";


export default function withAuth(ComponentToProtect) {


    return () => {
        const token = Cookies.get('token')
        console.log(token)

        const [loading, toggleloading] = useState(true);
        const [redirect, toggleredirect] = useState(false);

        const {login} = useSelector((state) => state.loginState)
        
        const dispatch = useDispatch()
        

        useEffect(() => {
            console.log(login)
            if(!!!login){
                console.log('yo')
                fetch('http://localhost:3000/api/login/auth', {
                    method: 'get'
                }).then(res => {
                    console.log(res)
                    if (res.status === 200) {

                        toggleloading(false);
                        dispatch(setLogin(true));
                        
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                })
                    .catch(err => {
                        console.error(err);
                        toggleloading(false);
                        toggleredirect(true);
                    });
            } else{
                toggleloading(false);
            }
            
        },[login]);
 
     

        if (loading) {
            return null;
        }
        if (redirect) {
            return <Redirect to="/login" />;
        }
        return <ComponentToProtect />;
        
    }
}
