import React from 'react';
//imagenes
import Header from '../template/Header';
//css
import '../assetss/css/App.css'
//servicio
import topTechApi from '../services/topTechApi';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';



class Desafios extends React.Component{

    //en el estado almacenaremos toda los datos de los desafios
    state = {
        desafios: [],
        modalInsertar: false, //estado para abrir y cerrar el modal 
        form: {
            nombre_desafio: '',
            status: '',
            puntaje_desafio: '',
            paso1Desafio: '',
            paso2Desafio: '',
            paso3Desafio: '',
            paso4Desafio: '',
            id: '',
            tipoModal: ''
        }
    }

    //metodo para hacer la peticion get
    // Para obtener todos los desafios
    peticionGet = () => {
        let url = "desafios";
        const token = JSON.parse(localStorage.getItem('token'));
        topTechApi.get(url, { headers: { "Authorization": `Bearer ${token}` } }
        ).then(response => {
            console.log('token', response.data.token);
            this.setState({ desafios: response.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    //es asincrono porque se esta ejecutando en segundo plano
    //Para agregar desafio
    peticionPost = async () => {
        let url = "desafios/";
        delete this.state.form.id;
        const token = JSON.parse(localStorage.getItem('token'));
        await topTechApi.post(url, this.state.form,
            {
                headers:
                    { "Authorization": `Bearer ${token}` },
            })
            .then(response => {
                localStorage.getItem('token', JSON.stringify(response.data.token));
                this.modalInsertar();// al momento que el usuario inserte cerramos el modal
                this.peticionGet(); //y actualizamos los datos en la tabla
            }).catch(error => {
                console.log(error.message);
            })
    }

    //modificar todos los campos del desafío
    peticionPut=()=>{
        let url = "desafios/";
        const token = JSON.parse(localStorage.getItem('token'));
        topTechApi.put(url+this.state.form.desafio_id, this.state.form,
            { headers: 
                {"Authorization" : `Bearer ${token}`}, 
            })
        .then(response=>{
            localStorage.getItem('token', JSON.stringify(response.data.token)); 
            this.modalInsertar();
            this.peticionGet();
        })
      }

    //Modificar solo el estado en el checkbox del desafío
    peticionPutEstado =(id, desafio) =>{
        let url = "desafios/";
        const token = JSON.parse(localStorage.getItem('token'));
        topTechApi.put(url+ "status/"+ id, desafio,
            { headers: 
                {"Authorization" : `Bearer ${token}`}, 
            })
        .then(response=>{
            localStorage.getItem('token', JSON.stringify(response.data.token)); 
            this.peticionGet();
        })
    }


    //metodo para cambiar el estado de true a false
    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }

    seleccionarDesafio = (desafio) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                nombre_desafio: desafio.nombre_desafio,
                status: desafio.status,
                puntaje_desafio: desafio.puntaje_desafio,
                paso1Desafio: desafio.paso1Desafio,
                paso2Desafio: desafio.paso2Desafio,
                paso3Desafio: desafio.paso3Desafio,
                paso4Desafio: desafio.paso4Desafio,
                desafio_id: desafio.id
            }
        })
    }


    //capturamos lo que el usuario escribe en los imputs
    //para esto necesitamos los atributos adentro de el form en el estado
    //es asincrono porque se esta ejecutando en segundo plano
    handleChange = async e => {
        e.persist();
        await this.setState({ //cambiamos el estado cuando el usuario este escribiendo en el imput
            form: {
                ...this.state.form, //es para heredar todos los atributos que ya existan en el form y no se borren al momento queel usuario escriba
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form); //mostramos en consola todo lo que va capturando
    }

    //esta sera la primera peticion que se ejecute al iniciar la pagina
    componentDidMount() {
        this.peticionGet();
    }


    render() {
        const form = this.state.form; //esto se usa para no tener que poner this.state dentro del return
        return (
            <React.Fragment>
                <Header />
                <div className="App">
                    <br /><br />
                    <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Desafio</button>
                    <br /><br />
                    <div className="container table-responsive">
                        <table className="table table-hover table-light align-middle">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NOMBRE</th>
                                    <th scope="col">ESTADO</th>
                                    <th scope="col">PUNTAJE</th>
                                    <th scope="col">PASO 1</th>
                                    <th scope="col">PASO 2</th>
                                    <th scope="col">PASO 3</th>
                                    <th scope="col">PASO 4</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.desafios.map(desafio => {
                                    return (
                                        <tr>
                                            <td>{desafio.id}</td>
                                            <td>{desafio.nombre_desafio}</td>
                                            {/* {/*<td>{desafio.status ? "Activo" : "Inactivo"}</td> */}
                                            <td><input type="checkbox" defaultChecked={desafio.status}
                                                onChange={e => {
                                                    // this.seleccionarDesafio({ status: e.target.checked})
                                                    this.peticionPutEstado(desafio.id, {status: e.target.checked})
                                                }} /> </td>
                                            <td>{desafio.puntaje_desafio}</td>
                                            <td>{desafio.paso1Desafio}</td>
                                            <td>{desafio.paso2Desafio}</td>
                                            <td>{desafio.paso3Desafio}</td>
                                            <td>{desafio.paso4Desafio}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => { this.seleccionarDesafio(desafio); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
                                                {"   "}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        <Modal isOpen={this.state.modalInsertar} fullscreen="lg">
                            <ModalHeader style={{ display: 'block' }}>
                                <span onClick={() => this.modalInsertar()} style={{ float: 'right' }}>x</span>
                            </ModalHeader>
                            <ModalBody style={{ width: 560, padding: 30 }}>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label className="col-md-12 control-label"> Nombre</label>
                                            <div className="col-lg-12">
                                                <input className="form-control" name="nombre_desafio"
                                                    placeholder="nombre" type="text"
                                                    value={form ? form.nombre_desafio : ''}
                                                    onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="col-md-2 control-label"> Estado</label>
                                            <div className="col-lg-12">
                                                <input className="form-control" name="status"
                                                    placeholder="estado" type="text"
                                                    value={form ? form.status : ''}
                                                    onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="col-md-2 control-label"> Puntaje</label>
                                            <div className="col-lg-10">
                                                <input className="form-control" name="puntaje_desafio"
                                                    placeholder="puntaje" type="text"
                                                    value={form ? form.puntaje_desafio : ''}
                                                    onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <label className="col-xs-2 control-label"> Paso 1</label>
                                            <div className="col-lg-12">
                                                <input className="form-control" name="paso1Desafio"
                                                    placeholder="paso 1" type="text"
                                                    value={form ? form.paso1Desafio : ''}
                                                    onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <label className="col-xs-2 control-label"> Paso 2</label>
                                            <div className="col-lg-12">
                                                <input className="form-control" name="paso2Desafio"
                                                    placeholder="paso 2" type="text"
                                                    value={form ? form.paso2Desafio : ''}
                                                    onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <label className="col-xs-2 control-label"> Paso 3</label>
                                            <div className="col-lg-12">
                                                <input className="form-control" name="paso3Desafio"
                                                    placeholder="paso 3" type="text"
                                                    value={form ? form.paso3Desafio : ''}
                                                    onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <label className="col-xs-2 control-label"> Paso 4</label>
                                            <div className="col-lg-12">
                                                <input className="form-control" rows="2" name="paso4Desafio"
                                                    placeholder="paso 4" type="text"
                                                    value={form ? form.paso4Desafio : ''}
                                                    onChange={this.handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>

                            <ModalFooter>
                                {this.state.tipoModal === 'insertar' ? //con esto le decimos a los botones que si el modal lo vamos a usar para insertar tiene que llamar a la peticion post, pero si es para actualizar tiene que llamar a la peticion put
                                    <button className="btn btn-success" onClick={() => this.peticionPost()}>
                                        Insertar
                                    </button> : <button className="btn btn-success" onClick={() => this.peticionPut()}>
                                        Actualizar
                                    </button>
                                }
                                <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Desafios;