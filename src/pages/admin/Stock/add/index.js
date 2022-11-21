import { TextField } from '@mui/material'
import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Navigation } from 'react-feather'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AddStockData } from '../../../../api/request'
import { BackButton } from '../../../../components/back-button'
import { successNotif } from '../../../../components/notification'
import PageHeader from '../../../../layouts/components/page-header'

const AddStock = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = React.useState(false)
    const [form , setForm] = React.useState({
        nom_fournisseur: '',
        numero_fournisseur: '',
    })
    const [errorForm , setErrorForm] = React.useState({})
    const handlerInput = (e) => {
        e.preventDefault();
        const target = e.target;
        const value = target?.value;
        const name = target?.name;
        setForm({
            ...form,
            [name]: value
        })
    };
    const onSubmit = async () => {
        if(!form.nom_fournisseur || !form.numero_fournisseur){
            setErrorForm({
                nom_fournisseur: !form.nom_fournisseur ? 'ce champ est obligatoire' : '',
                numero_fournisseur: !form.numero_fournisseur ? 'ce champ est obligatoire' : '',
            })
            return;
        }
        setIsLoading(true)
        try{
            const response = await AddStockData(form);
            if(response.status === 200){
                successNotif('Stock ajouté avec succès')
                setForm({
                    nom_fournisseur: '',
                    numero_fournisseur: '',
                })
                const dataReceived = response.data?.data;
                navigate('/stock/details' , {state: dataReceived})
            }
            setIsLoading(false)
            successNotif('Stock ajouté avec succès')
        }catch(e){
            setIsLoading(false)
            console.log(e)

        }
    }

    return (
        <>
            <PageHeader title="Ajouter un stock">
                <div className="offset-sm-10 col-sm-9">
                    <BackButton />
                </div>
            </PageHeader>
            <Row >
            <Col md={8} sm={12} xs={12} >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <Card.Header>
                        <Card.Title as="h5">Ajouter un stock</Card.Title>
                    </Card.Header>
                    <Card.Body>
                       
                            <Form.Group className="mb-3">
                                <TextField 
                                    id="outlined-basic"
                                    label="Nom du fournisseur"
                                    variant="outlined"
                                    type="text"
                                    value={form.nom_fournisseur}
                                    name="nom_fournisseur"
                                    onChange={handlerInput}
                                    size="small"
                                    fullWidth
                                    onFocus={() => setErrorForm({...errorForm, nom_fournisseur: ''})}
                                    error={!!errorForm.nom_fournisseur}
                                    helperText={errorForm.nom_fournisseur}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <TextField 
                                    id="outlined-basic"
                                    label="Numero du fournisseur"
                                    variant="outlined"
                                    type="text"
                                    value={form.numero_fournisseur}
                                    name="numero_fournisseur"
                                    onChange={handlerInput}
                                    size="small"
                                    fullWidth
                                    onFocus={() => setErrorForm({
                                        ...errorForm,
                                        numero_fournisseur: ''
                                    })}
                                    error={!!errorForm.numero_fournisseur}
                                    helperText={errorForm.numero_fournisseur}
                                />
                            </Form.Group>
                        
                    </Card.Body>
                </Card>
                <Card body>
                    <Button variant="primary" type="submit">
                        Enregistrer
                    </Button>
                </Card>
                </Form>
            </Col>
        </Row>
        </>
    )
}

export default AddStock
