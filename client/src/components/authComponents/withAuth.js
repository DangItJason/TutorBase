import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../../AppContext';


export default function withAuth(ComponentToProtect,useSession) {

    let session = null;
    let setSession = null;

    if(useSession !== undefined){
        ({session,setSession} = useSession);
    }
   
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }
        componentDidMount() {
    
            if(useSession && !!!session.authenticated){
                console.log(session);
                fetch('http://localhost:3000/api/login/auth', {
                    method: 'get'
                }).then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        this.setState({ loading: false });
                        setSession({...session,authenticated:true})
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                })
                    .catch(err => {
                        console.error(err);
                        this.setState({ loading: false, redirect: true });
                    });
            } else{
                this.setState({ loading: false });
            }
        }
        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/login" />;
            }
            return <AppContext.Provider value={session}><ComponentToProtect {...this.props} /></AppContext.Provider>;
        }
    }
}
