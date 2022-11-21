import React, { useEffect, useRef } from 'react'
import { Button, Card, Spinner } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import Searcher from '../../../../components/data-table-search'
import NotDataBox from '../../../../components/no-data'
import PageHeader from '../../../../layouts/components/page-header'
import RegistredModal from '../components/registered-modal'
import tableColums from './data'


const Stock = () => {
    const { state } = useLocation();
    console.log(state)
    const navigate = useNavigate()
    const [isLoading , setIsLoading] = React.useState(false)
    const [search , setSearch] = React.useState('')
    const [registredId , setRegistredId] = React.useState([])
    const [registrations , setRegistrations] = React.useState(state?.registrations ?? [])
    const [showModal , setShowModal] = React.useState(false)
    const array = useRef([])


    const onClickRow = (row , action = null) => {
        navigate(`/motors/edit`, {state: row})
    }
    useEffect(() => {
        
        const _registration = state?.registrations?.filter((motor) => {
            return motor?.sales?.nom_client?.toLowerCase().match(search?.toLowerCase())
        })
        console.log(_registration)
        setRegistrations(_registration)
    }, [search ])

   
        const handleRowSelected = (row) => {
            console.log(row.selectedRows)
            getLastId(row.selectedRows)
            console.log(array.current)

        }

        const getLastId = (selectedRows) => {
            let _registredId = []
            selectedRows?.map((row) => {
                let IdString = row?.id.toString()
                _registredId.push(IdString)
            })
            array.current = _registredId
        }
        

    return (
<>
            <PageHeader title={
                `Details du lot ${state?.numero}`
            }>
                <div className="offset-sm-5 col-sm-10">
                <Button
                    className="mr-2"
                    variant="dark"
                    size="md"
                    onClick={() => navigate(-1)}
                >
                    <i className="zmdi zmdi-accounts-list-alt"></i> Retour
                </Button>
                <Button
                 className="mr-2"
                    variant="primary"
                    onClick={() => setShowModal(true)}
                >
                    Ajouter de demande
                </Button>
                <Button
                className="mr-2"
                    variant="success"
                    onClick={() => navigate('/stock/edit' , {state: state})}
                >
                    Modifier le lot
                </Button>
                <Button
                    
                    variant="danger"
                    onClick={() => navigate('/motors/add' , {state: {id: state?.id , numero: state?.numero}})}
                >
                   Supprimer  le lot
                </Button>
                </div>
            </PageHeader>
            <RegistredModal show={showModal} handleClose={() => setShowModal(false)} handleSelected={(row) => handleRowSelected(row)} />
            <Card body>
                
                    <>
                        <DataTable
                            columns={tableColums(onClickRow)}
                            data={registrations}
                            title= {
                                <Searcher
                                    placeholder={"Entrer le numéro du journal"}
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                />
                            }
                            onRowClicked={onClickRow}
                            progressComponent={<Spinner />}
                            pointerOnHover
                            noDataComponent={
                                isLoading ? (
                                    <Spinner />
                                ) : (
                                    <NotDataBox
                                        message={
                                            "Aucun stock n'a été trouvé"
                                        }
                                    />
                                )
                            }
                            pagination
                            className='table-responsive'
                            
                        />
                    </>
                
                    
               
                <ReactTooltip id="tooltip" />
            </Card>
       </>
    )
}

export default Stock