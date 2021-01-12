import React, {useState, useEffect} from 'react';
import md5 from 'md5';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Login.css'; 

function Login(props) {

    const baseUrl = "https://localhost:44338/api/users";
    const cookies = new Cookies();

    const[form, setForm] = useState ({
        username: '',
        password: ''
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
        console.log(form);
    }

    const iniciarSesion = async() => {
        await axios.get(baseUrl+`/${form.username}/${md5(form.password)}`)
        .then(response => {
            return response.data;
        })
        .then(response => {
            if (response.length > 0) {
                var respuesta = response[0];
                cookies.set('Id', respuesta.id, {path: '/'});
                cookies.set('Nombre', respuesta.nombre, {path: '/'});
                cookies.set('Apellido', respuesta.apellido, {path: '/'});
                cookies.set('Email', respuesta.email, {path: '/'});
                cookies.set('Username', respuesta.username, {path: '/'});
                cookies.set('Password', respuesta.password, {path: '/'});
                alert("Bienvenido: "+respuesta.nombre+""+respuesta.apellido);
                props.history.push('/menu');
            } else {
                alert("Username or Password failed");
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        if (cookies.get('Id')) {
            props.history.push('/menu');
        }
    },[]);

    return(
        <div className="containerPrincipal">
            <div className="containerLogin">
                <div className="form-group">
                    <label> UserName: </label>
                    <br />
                    <input type="text" className="form-control" name="username" onChange={handleChange}/>
                    <br/>
                    <label> Password: </label>
                    <br />
                    <input type="password" className="form-control" name="password" onChange={handleChange}/>
                    <br />
                    <button className="btn btn-primary btn-block" onClick={() => iniciarSesion()}> Log In </button>
                </div>
            </div>
        </div>
    );
}

export default Login;