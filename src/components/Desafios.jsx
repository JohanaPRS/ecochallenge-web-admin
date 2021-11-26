import React, { useState, useEffect } from 'react';
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
import { getItem } from "../utils/localStorage";


const Desafios = (props) => {

    const [state, setState] = useState({
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
    });

    // Un efecto se usa para ejucutar algo mientras el componente se carga
    useEffect(() => {
        peticionGet();
    }, []);

    const peticionGet = () => {
        let url = "desafios";
        const token = JSON.parse(getItem('token'));
        topTechApi.get(url, { headers: { "Authorization": `Bearer ${token}` } }
        ).then(response => {
            console.log('token', response.data.token);
            setState({
                ...state,
                desafios: response.data,
                modalInsertar: false
            });            
        }).catch(error => {
            console.log(error.message);
        })
    }

    //es asincrono porque se esta ejecutando en segundo plano
    //Para agregar desafio
    const peticionPost = async () => {
        let url = "desafios/";
        delete state.form.id;
        const token = JSON.parse(getItem('token'));
        await topTechApi.post(url, state.form,
            {
                headers:
                    { "Authorization": `Bearer ${token}` },
            })
            .then(response => {
                getItem('token', JSON.stringify(response.data.token));
                modalClose();// al momento que el usuario inserte cerramos el modal
                peticionGet(); //y actualizamos los datos en la tabla
            }).catch(error => {
                console.log(error.message);
            })
    }

    //modificar todos los campos del desafío
    const peticionPut=()=>{
        let url = "desafios/";
        const token = JSON.parse(getItem('token'));
        topTechApi.put(url+state.form.desafio_id, state.form,
            { headers: 
                {"Authorization" : `Bearer ${token}`}, 
            })
        .then(response=>{
            getItem('token', JSON.stringify(response.data.token)); 
            modalClose();
            peticionGet();
        })
    }

    //Modificar solo el estado en el checkbox del desafío
    const peticionPutEstado =(id, desafio) =>{
        let url = "desafios/";
        const token = JSON.parse(getItem('token'));
        topTechApi.put(url+ "status/"+ id, desafio,
            { headers: 
                {"Authorization" : `Bearer ${token}`}, 
            })
        .then(response=>{
            getItem('token', JSON.stringify(response.data.token)); 
            peticionGet();
        })
    }    

    const seleccionarDesafio = (desafio) => {
        setState({
            ...state,
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
            },
            modalInsertar: !state.modalInsertar 
        })
    }

    //capturamos lo que el usuario escribe en los imputs
    //para esto necesitamos los atributos adentro de el form en el estado
    //es asincrono porque se esta ejecutando en segundo plano
    const handleChange = e => {
        e.persist();
        setState({ //cambiamos el estado cuando el usuario este escribiendo en el imput
            ...state,
            form: {
                ...state.form, //es para heredar todos los atributos que ya existan en el form y no se borren al momento queel usuario escriba
                [e.target.name]: e.target.value
            }
        });        
    }

    // Mostrar el modal de adicionar un desafio
    const agragarDesafio = () => {
        setState({ 
            ...state,
            form: null, 
            tipoModal: 'insertar', 
            modalInsertar: !state.modalInsertar 
        });         
    }

    const modalClose = () => {
        setState({ 
            ...state,
            modalInsertar: false
        });    
    }

    const form = state.form;
    
    return (
        <>
            <Header />
            <div className="App">
                <div className="buscar-desafio-container">
                    <div className="buscador">
                        <label htmlFor="buscar">Buscar: </label>
                        <input type="text" name="buscar" className="form-control" placeholder="Criterio de busqueda"/>
                    </div>
                    <div>
                        <br /><br />
                            <button className="btn btn-success" onClick={agragarDesafio}>Agregar Desafio</button>
                        <br /><br />
                    </div>
                </div>
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
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.desafios.map(desafio => {
                                return (
                                    <tr key={desafio.id}>
                                        <td>{desafio.id}</td>
                                        <td>{desafio.nombre_desafio}</td>                                        
                                        <td><input type="checkbox" defaultChecked={desafio.status} onChange={e => { peticionPutEstado(desafio.id, {status: e.target.checked})}} /></td>
                                        <td>{desafio.puntaje_desafio}</td>
                                        <td>{desafio.paso1Desafio}</td>
                                        <td>{desafio.paso2Desafio}</td>
                                        <td>{desafio.paso3Desafio}</td>
                                        <td>{desafio.paso4Desafio}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => { seleccionarDesafio(desafio); }}><FontAwesomeIcon icon={faEdit} /></button>
                                            {"   "}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <Modal isOpen={state.modalInsertar} fullscreen="lg">
                        <ModalHeader style={{ display: 'block' }}>
                            { state.tipoModal === 'insertar' ? <span>Insertar Desafio</span> : <span>Modificar Desafio</span> }
                            <span style={{ float: 'right', cursor: 'pointer' }} onClick={modalClose}>x</span>
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
                                                onChange={ handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-md-2 control-label"> Estado</label>
                                        <div className="col-lg-12">
                                            <input className="form-control" name="status"
                                                placeholder="estado" type="text"
                                                value={form ? form.status : ''}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-md-2 control-label"> Puntaje</label>
                                        <div className="col-lg-10">
                                            <input className="form-control" name="puntaje_desafio"
                                                placeholder="puntaje" type="text"
                                                value={form ? form.puntaje_desafio : ''}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="col-xs-2 control-label"> Paso 1</label>
                                        <div className="col-lg-12">
                                            <input className="form-control" name="paso1Desafio"
                                                placeholder="paso 1" type="text"
                                                value={form ? form.paso1Desafio : ''}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="col-xs-2 control-label"> Paso 2</label>
                                        <div className="col-lg-12">
                                            <input className="form-control" name="paso2Desafio"
                                                placeholder="paso 2" type="text"
                                                value={form ? form.paso2Desafio : ''}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="col-xs-2 control-label"> Paso 3</label>
                                        <div className="col-lg-12">
                                            <input className="form-control" name="paso3Desafio"
                                                placeholder="paso 3" type="text"
                                                value={form ? form.paso3Desafio : ''}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="col-xs-2 control-label"> Paso 4</label>
                                        <div className="col-lg-12">
                                            <input className="form-control" rows="2" name="paso4Desafio"
                                                placeholder="paso 4" type="text"
                                                value={form ? form.paso4Desafio : ''}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            {state.tipoModal === 'insertar' ? //con esto le decimos a los botones que si el modal lo vamos a usar para insertar tiene que llamar a la peticion post, pero si es para actualizar tiene que llamar a la peticion put
                                <button className="btn btn-success" onClick={() => peticionPost()}>
                                    Insertar
                                </button> : <button className="btn btn-success" onClick={() => peticionPut()}>
                                    Actualizar
                                </button>
                            }
                            <button className="btn btn-danger" onClick={() => modalClose()}>Cancelar</button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        </>
    );   
}

export default Desafios;