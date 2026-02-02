import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ContactModal({ show, handleClose, propertyTitle }) {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Datos del formularo:', formData);
        console.log('Propiedad:', propertyTitle);

        alert('Mensaje enviado correctamente');

        handleClose();

        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            mensaje: ''
        });

    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Contactar sobre esta propriedad</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className='text-muted mb-3'>
                    <strong>{propertyTitle}</strong>
                </p>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='nombre'>
                        <Form.Label>Nombre *</Form.Label>
                        <Form.Control
                            type='text'
                            name='nombre'
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder='Nombre completo'
                            required
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='email'>
                        <Form.Label>E-mail *</Form.Label>
                        <Form.Control
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='email@homelist.com'
                            required
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='telefono'>
                        <Form.Label>Telefono *</Form.Label>
                        <Form.Control
                            type='tel'
                            name='telefono'
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder='+34 600 000 000'
                            required
                        />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='mensaje'>
                        <Form.Label>Mensaje *</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={4}
                            name='mensaje'
                            value={formData.mensaje}
                            onChange={handleChange}
                            placeholder='Estoy interesado en esta propriedad...'
                            required
                        />
                    </Form.Group>

                    <div className='d-grid gap-2'>
                        <Button
                            variant='primary'
                            type='submit'
                        >
                            Enviar mensaje
                        </Button>
                        <Button
                            variant='secondary'
                            onClick={handleClose}
                        >
                            Cancelar
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ContactModal;