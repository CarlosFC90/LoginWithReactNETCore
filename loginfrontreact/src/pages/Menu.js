import React, {useEffect} from 'react';
import Cookies from 'universal-cookie';
import '../css/Menu.css';

function Menu(props) {

    const cookies = new Cookies();

    const logOut = () => {
        cookies.remove('Id', {path: '/'});
        cookies.remove('Nombre', {path: '/'});
        cookies.remove('Apellido', {path: '/'});
        cookies.remove('Email', {path: '/'});
        cookies.remove('Username', {path: '/'});
        cookies.remove('Password', {path: '/'});
        props.history.push('./');
    }

    useEffect(() => {
        if (!cookies.get('Id')) {
            props.history.push('./');
        }
    },[]);

    return(
        <div className="containerMenu">
           <br/>
           <button className="btn btn-danger" onClick={() => logOut()}> Log Out </button>
           <br />
           <h5>ID: {cookies.get('Id')}</h5> 
           <br/>
           <h5>Nombre: {cookies.get('Nombre')}</h5> 
           <br/>
           <h5>Apellido: {cookies.get('Apellido')}</h5> 
           <br/>
           <h5>Email: {cookies.get('Email')}</h5> 
           <br/>
           <h5>Username: {cookies.get('Username')}</h5> 
           <br/>
           <h5>Password: {cookies.get('Password')}</h5> 
           <br/>
        </div>
    );
}

export default Menu;