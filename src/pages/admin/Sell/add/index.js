import { TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import DropFileImage from '../../../../components/drop-file-image'
import PageHeader from '../../../../layouts/components/page-header'
import CommercialModal from '../components/commerciale-modal'
import MotorsModal from '../components/numero-serie-modal'

const AddSales = () => {
const { register, handleSubmit, formState: { errors } } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [showCommercial , setShowCommercial] = useState(false)
  const [showMotorcycle , setShowMotorcycle] = useState(false)
  const selectCommercial = useRef(null)
  const selectMotor = useRef(null)
  const marque = useRef(null)
    const modele = useRef(null)
    const couleur = useRef(null)
    const numero_serie = useRef(null)
    const commercial = useRef(null)
  const [saleForm , setSaleForm] = useState({
    moto_id : selectMotor?.current?.selectedRows[0]?.numero_serie ,
    commercial_id : '',
    date : '',
    prix_vente : '',
    montant_verse : '',
    montant_restant : '',
    nom_client : '',
    telephone_client : '',
    adresse_client : '',
    identifiant_client : '',
  })
  const [errorForm , setErrorForm] = useState({
    
  })

    const handleShowCommercial = () => setShowCommercial(true)
    const handleCloseCommercial = () => setShowCommercial(false)
    const handleShowMotor = () => setShowMotorcycle(true)
    const handleCloseMotor = () => setShowMotorcycle(false)
    const handleSelectCommercial = (state) => {
        commercial.current = state?.selectedRows[0]?.pseudo
    }
    const handleSelectMotor = (state) => {
        numero_serie.current = state?.selectedRows[0]?.numero_serie
        marque.current =state?.selectedRows[0]?.marque
        modele.current =state?.selectedRows[0]?.modele
        couleur.current =state?.selectedRows[0]?.couleur
        console.log(marque.current)
    }

    const handlerInput = (e) => {
        e.preventDefault();
        const target = e.target;
        const value = target?.value;
        const name = target?.name;
        setSaleForm({
            ...saleForm,
            [name] : value
        })
    }

    const onSubmit = () => {
        if(!saleForm.moto_id ||
             !saleForm.commercial_id
             || !saleForm.date
             || !saleForm.prix_vente
             || !saleForm.montant_verse
             || !saleForm.montant_restant
             || !saleForm.nom_client
             || !saleForm.telephone_client
             || !saleForm.adresse_client
             || !saleForm.identifiant_client
             ){
            setErrorForm({
                moto_id : !saleForm.moto_id ? 'Ce champ est obligatoire' : '',
                commercial_id : !saleForm.commercial_id ? 'Ce champ est obligatoire' : '',
                date : !saleForm.date ? 'Ce champ est obligatoire' : '',
                prix_vente : !saleForm.prix_vente ? 'Ce champ est obligatoire' : '',
                montant_verse : !saleForm.montant_verse ? 'Ce champ est obligatoire' : '',
                montant_restant : !saleForm.montant_restant ? 'Ce champ est obligatoire' : '',
                nom_client : !saleForm.nom_client ? 'Ce champ est obligatoire' : '',
                telephone_client : !saleForm.telephone_client ? 'Ce champ est obligatoire' : '',
                adresse_client : !saleForm.adresse_client ? 'Ce champ est obligatoire' : '',
                identifiant_client : !saleForm.identifiant_client ? 'Ce champ est obligatoire' : '',
            })
            return ;
        }
    }
  return (
    <>
      <PageHeader title="Ajouter un commercial">
        
      </PageHeader>
      <MotorsModal show={showMotorcycle} handleClose={handleCloseMotor} handleSelected={(state) => handleSelectMotor(state)} />
      <CommercialModal show={showCommercial} handleClose={handleCloseCommercial} handleSelected={(state) => handleSelectCommercial(state)} />
      <Row>
        <Col md={4} sm={12} xs={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Informations de l'engin</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form className="form theme-form" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <TextField
                   disabled = {!numero_serie.current ? false : true}
                    id="outlined-basic"
                    label={!numero_serie.current ? "Numero de serie" : ""}
                    type="text"
                    name='moto_id'
                    onChange={handlerInput}
                    value={numero_serie.current}
                    size="small"
                    fullWidth
                    aria-readonly = {false}
                    onClick={handleShowMotor}
                    error={errorForm?.moto_id ? true : false}
                    helperText={errorForm?.moto_id ? errorForm?.moto_id : ''}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <TextField
                    disabled = {!marque.current ? false : true}
                    id="outlined-basic"
                    label={!marque.current ? 'Marque' : ''}
                    variant="outlined"
                    type="text"
                    name='marque'
                    onChange={handlerInput}
                    value={marque.current}
                    size="small"
                    fullWidth
                    aria-readonly = {false}
                    error={errorForm?.marque ? true : false}
                    helperText={errorForm?.marque ? errorForm?.marque : ''}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <TextField
                    disabled = {!modele.current ? false : true}
                    id="outlined-basic"
                    label={!modele.current ? 'Modele' : ''}
                    variant="outlined"
                    type="text"
                    name='modele'
                    onChange={handlerInput}
                    value={modele.current}
                    size="small"
                    fullWidth
                    aria-readonly = {true}
                    error={errorForm?.modele ? true : false}
                    helperText={errorForm?.modele ? errorForm?.modele : ''}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <TextField
                    disabled = {!couleur.current ? false : true}
                    id="outlined-basic"
                    label={!couleur.current ? 'Couleur' : ''}
                    variant="outlined"
                    type="text"
                    value={couleur.current}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                    error={errorForm?.couleur ? true : false}
                    helperText={errorForm?.couleur ? errorForm?.couleur : ''}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Prix de l'engin"
                    variant="outlined"
                    type="text"
                    name='prix_vente'
                    value={saleForm?.prix_vente}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                    aria-readonly = {true}
                    error={errorForm?.prix_vente ? true : false}
                    helperText={errorForm?.prix_vente ? errorForm?.prix_vente : ''}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12} xs={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Informations du client</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form className="form theme-form">
                <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Nom du client"
                    variant="outlined"
                    type="text"
                    name='nom_client'
                    value={saleForm?.nom_client}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                    error={errorForm?.nom_client ? true : false}
                    helperText={errorForm?.nom_client ? errorForm?.nom_client : ''}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Prenom du client"
                    variant="outlined"
                    type="text"
                    name='prenom_client'
                    value={saleForm?.prenom_client}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                    error={errorForm?.prenom_client ? true : false}
                    helperText={errorForm?.prenom_client ? errorForm?.prenom_client : ''}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Numero du client"
                    variant="outlined"
                    type="text"
                    name='telephone_client'
                    value={saleForm?.telephone_client}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                    error={errorForm?.telephone_client ? true : false}
                    helperText={errorForm?.telephone_client ? errorForm?.telephone_client : ''}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Adresse du client"
                    variant="outlined"
                    type="text"
                    name='adresse_client'
                    value={saleForm?.adresse_client}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                    error={errorForm?.adresse_client ? true : false}
                    helperText={errorForm?.adresse_client ? errorForm?.adresse_client : ''}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Numero de CNIB"
                    variant="outlined"
                    type="text"
                    name='identifiant_client'
                    value={saleForm?.identifiant_client}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                    error={errorForm?.identifiant_client ? true : false}
                    helperText={errorForm?.identifiant_client ? errorForm?.identifiant_client : ''}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={12} xs={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Informations de la vente</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form className="form theme-form">
                <Form.Group className="mb-3">
                   
                  <TextField
                    disabled = {!commercial.current ? false : true}
                    id="outlined-basic"
                    label={!commercial.current ? 'Commercial' : ''}
                    variant="outlined"
                    type="text"
                    name='commerciale'
                    value={commercial.current}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                    onClick={handleShowCommercial}
                    error={errorForm?.commercial_id ? true : false}
                    helperText={errorForm?.commercial_id ? errorForm?.commercial_id : ''}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Montant versé"
                    variant="outlined"
                    type="text"
                    value={saleForm?.montant_verse}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                    error={errorForm?.montant_verse ? true : false}
                    helperText={errorForm?.montant_verse ? errorForm?.montant_verse : ''}
                  />
                </Form.Group>
                {
                    parseInt(saleForm?.montant_verse) < parseInt(saleForm?.prix_vente) && (
                        <>
                            <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Montant restant"
                    variant="outlined"
                    type="text"
                    value={parseInt(saleForm?.prix_vente) - parseInt(saleForm?.montant_verse)} 
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                    error={errorForm?.montant_restant ? true : false}
                    helperText={errorForm?.montant_restant ? errorForm?.montant_restant : ''}

                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="date-limit"
                    variant="outlined"
                    type="text"
                    value={saleForm?.date_limit}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                    error={errorForm?.date_limit ? true : false}
                    helperText={errorForm?.date_limit ? errorForm?.date_limit : ''}
                  />
                </Form.Group>
                        </>
                    )
                }
                <Form.Group className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Numero de Facture"
                    variant="outlined"
                    type="text"
                    value={saleForm?.numero_facture}
                    onChange={handlerInput}
                    size="small"
                    fullWidth
                    error={errorForm?.numero_facture ? true : false}
                    helperText={errorForm?.numero_facture ? errorForm?.numero_facture : ''}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <Card body>
            <Button disabled={isLoading} variant="primary" type="submit">
              Enregistrer
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default AddSales
