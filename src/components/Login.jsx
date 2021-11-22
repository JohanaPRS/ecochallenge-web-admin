import React from 'react';
//css
import '../assetss/css/Login.css'
//imagenes
import logoApp from '../assetss/img/logoApp.png'
//servicio
import topTechApi from '../services/topTechApi';
//librerias
//import axios from 'axios';

class Login extends React.Component{

    /* Creamos un constructor para pasarle las propiedades props que vamos a usar 
    ** para que el navegador vaya al dashboard una vez que valida el token al
    **ingresar correctamente las credenciales
    */
   constructor(props){
       super(props); //este codigo es para que podamos usar props en toda la clase
   }
   

    //Vinculamos los imput con el js que tiene la ruta a las api
    //Primero creamos un arreglo por el cual obtenemos los valores y los almacenamos ahí
    state={
        form:{
            "userName": "",
            "password": "",            
        },
        error:false, //variable para traer un mensaje cuando exista error
        errorMsg: "" //mensaje que se va a mostrar en el error
    }

    //maneja el evento de recargar la pagina cuando hacemos Ingresar
    manejadorSubmit=e=>{
        e.preventDefault()
    }

    //Metodo manejador
    //async hace que no tengamos que esperar a que la pagina se recargue para obtener el valor
    manejadorChange = async e=>{
        await this.setState({ //asigna un valor a la variable del estado
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }
    
    //manejador paa boton
    manejadorBtn=()=>{
        let url = "user/authenticate";
        topTechApi.post(url,this.state.form)
        .then( response=> {
            saveTokenInLocalStorage(response.data.token);
            //localStorage.setItem('token', response.data.token);
            console.log('token', response.data.token);
            this.props.history.push('/home');
            /*preguntamos por el estado de la respuesta
             * La respuesta puede ser estatus ok o estatus error
             * Si es estatus ok, vamos a redirigir y almacenar el token en el local storage
             * y si no, vamos a mostrar el error
             */
            /*if(response.data.status === "ok"){
                //si todo va bien almacenamos el token
                localStorage.setItem("token", response.data.result.token);
                //una vez que valida el token redireccionamos al dashboard con las props
                console.log(this.props.history);
                this.props.history.push("/home");*/
            /*}else{
                //asignamos un estado a las variables error y errorMsg
                this.setState({
                    error : true,
                    errorMsg : response.data.result.error_msg //acá va el nombre de la variable de la api que devuelve el error
                })
            }*/
        /*el metodo catch se utiliza para controlar los errores que no estan incluidos en la api
         * como por ejemplo que la api este caida o que no tengas internet
         */                
        }).catch( error => {
            console.log(error);
            this.setState({
                error : true,
                errorMsg : "Error: Password o usuario incorrectos"
            });
        })
    }


    render(){
        return(
            <React.Fragment> 
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                        <br/><br/>
                        </div>

                        <div className="fadeIn first">
                        <img src={logoApp} width="150px" alt="User Icon" /><br/><br/>
                        </div>

                        <form onSubmit={this.manejadorSubmit}>
                            <input type="text" className="fadeIn second" name="userName" placeholder="userName" onChange={this.manejadorChange}/>
                            <input type="password" className="fadeIn third" name="password" placeholder="Contraseña" onChange={this.manejadorChange}/><br/><br/>
                            <button type="button" className="btn btn-success btn-lg" onClick={this.manejadorBtn}>Ingresar</button><br/><br/>
                        </form>

                    {this.state.error === true &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMsg}
                        </div>
                    } 
                    </div>
                </div>

            </React.Fragment>

        );
    }
}
export function saveTokenInLocalStorage(tokenDetails){
    localStorage.setItem('token', JSON.stringify(tokenDetails));
}

export default Login