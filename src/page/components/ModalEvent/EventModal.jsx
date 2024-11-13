import { Button, Collapse } from 'bootstrap';
import React, { useState } from 'react';
import {Modal, from} from 'react-bootstrap';

const EventModal = ({evento, onclose, onDelete, onUpdate}) =>{
    const [editedEvent, setEditedEvent] = useState({...evento});
    const [Collapsed, setCollapsed] = useState(true);

    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setEditedEvent({...editedEvent, [name]:value});
    }
    const handleColorChange = (e)=>{
        setEditedEvent({...editedEvent, color:e.target.value});
    }
    const handleStarDateChange = (e)=>{
        const starDate = new Date(e.target.value);
        if(starDate <= editedEvent.end){
            setEditedEvent({...editedEvent, start:starDate});
        }
        
    }

    const handleEndDateChange = (e)=>{
        const endDate = new Date(e.target.value);
        if(endDate <= editedEvent.start){
            setEditedEvent({...editedEvent, end:endDate});
        }
        
    }
    const handleDelete = () =>{
        onDelete(evento.id);
    }
    const handleUpdate = () =>{
        onUpdate(editedEvent);
        onclose();
    }

    const adjustDate = (date) =>{
        const adjustedDate = new Date(date);
        adjustedDate.setHours(adjustedDate.getHours() - 3);
        return adjustedDate.toISOString().slice(0,-8);
    };



    return(
        <Modal show={true} onhider={onclose}>
            <Modal.Header>
                <Modal.Title>{editedEvent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <form.Label>Titulo</form.Label>
                        <Form.Control type="text" name='title' value={editedEvent.title} onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group controlId="formDesc">
                        <form.Label>Descrição</form.Label>
                        <Form.Control as="textarea" rows={3} name='desc' value={editedEvent.desc} onChange={handleInputChange}/>
                    </Form.Group>

                    <Collapse in={!Collapsed}>
                        <div>

                        <Form.Group controlId="formInicio">
                            <form.Label>Início</form.Label>
                            <Form.Control type="datetime-local" name='start' value={adjustDate(editedEvent.start)} onChange={handleStartDateChange}/>
                        </Form.Group>

                        <Form.Group controlId="formEnd">
                            <form.Label>Fim</form.Label>
                            <Form.Control type="datetime-local" name='end' value={adjustDate(editedEvent.end)} onChange={handleEndDateChange}/>
                        </Form.Group>

                        <Form.Group controlId="formColor">
                           <form.Label>Cor</form.Label>
                           <Form.Control type="color" name='color' value={editedEvent.color} onChange={handleColorChange}/>
                        </Form.Group>

                        <Form.Group controlId="formTipo">
                           <form.Label>Tipo</form.Label>
                           <Form.Control type="text" name='tipo' value={editedEvent.tipo} onChange={handleInputChange}/>
                        </Form.Group>
                        </div>
                    </Collapse>
                </Form>
            </Modal.Body>
            <Modal.Footer className='justify-content-between'>
                <Button variant='secondary' onClick={()=> setCollapsed(!Collapsed)}>
                    {!Collapsed ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
                </Button>
                <Button variant='danger' onClick={handleDelete}>
                    Apagar
                </Button>
                <Button variant='primary' onClick={handleUpdate}>
                    Salvar Alterações
                </Button>
            </Modal.Footer>
        </Modal>
    )

}

export default EventModal;