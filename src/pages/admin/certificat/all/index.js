import React, { useEffect, useRef } from 'react'
import { Button, Card, Row, Spinner } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { fetchMotorsCertified } from '../../../../api/request'
import Searcher from '../../../../components/data-table-search'
import NotDataBox from '../../../../components/no-data'
import { errorNotif } from '../../../../components/notification'
import { alertConfirm, alertConfirmation, testAlert } from '../../../../components/sweet-alert'
import PageHeader from '../../../../layouts/components/page-header'
import MotorsUncertifiedModal from '../components/motors-uncertified'
import tableColums from './data'

const MotorsCertified = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = React.useState(false)
    const [MotorsCertified, setMotorsCertified] = React.useState([])
    const [search , setSearch] = React.useState('')
    const [showModal, setShowModal] = React.useState(false)
    const array_certified = useRef([])
    const array_uncertified = useRef([])

    useEffect(() => {
        (async () => await fetchMotorsCertifiedData())()
    }, [search])
    const fetchMotorsCertifiedData = async () => {
        try {

            setMotorsCertified([])
            setIsLoading(true);
            const response = await fetchMotorsCertified();
            const dataReceive = response?.data ?? null;
            const _certified = dataReceive?.data ?? [];
            console.log(_certified)
            const filtered = _certified?.filter((data) => {
                return data?.numero_serie?.toLowerCase().match(search?.toLowerCase())
            })
            if (_certified?.length > 0) {
                setMotorsCertified(filtered);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (typeof error === "object") {
            } else {
                errorNotif("Avertissement", error);
            }
        }

    };
    const handleDelete = () => {
        alertConfirmation(
            "Etes vous sur de vouloir supprimer ces données ?",
            ({ isConfirmed }) => {
                if (isConfirmed) {
                    console.log(array_certified.current , "certified")
                }
            }
        )
    }

    const getLastId = (selectedRows , array = []) => {
        let _registredId = []
        selectedRows?.map((row) => {
            let IdString = row?.id.toString()
            _registredId.push(IdString)
        })
        array.current = _registredId
    }
    const handleSelect = (row) => {
        getLastId(row?.selectedRows , array_certified)
    }
    const handleSelected = (row) => {
        getLastId(row?.selectedRows , array_uncertified)
        console.log(array_uncertified.current)
    }
    const handleSubmit = async () => {
        setShowModal(false)
     console.log(array_uncertified.current , "certified")
    }






        const onClickRow = (row , action = null) => {}
    return (
        <>
            <PageHeader title="Listes des certication demise en circulation" >
                <div className="offset-sm-10 col-sm-9">
                    <Button variant="primary" size="md" className="btn-square" onClick={() => setShowModal(true)}>
                        <i className="fa fa-plus"></i> Ajouter
                    </Button>
                </div>
            </PageHeader>
            <MotorsUncertifiedModal show={showModal} handleClose={() => setShowModal(false)}  handleSelect={(row) => handleSelected(row)} handleSubmit={handleSubmit} />
            <Card body>
                <DataTable
                            columns={tableColums(onClickRow)}
                            data={MotorsCertified}
                            title={
                                <Searcher
                                    placeholder={"Entrer le numéro du journal"}
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                />
                            }
                            onRowClicked={onClickRow}
                            progressComponent={<Spinner />}
                            pagination
                            contextActions={
                                <>
                                    <Button variant="danger" size="sm" className="btn-square mr-2" onClick={handleDelete}>
                                    <i className="fa fa-trash"></i> Supprimer
                                </Button>
                                {" "}
                                </>
                            }
                            selectableRows
                            onSelectedRowsChange={(state) => handleSelect(state)}
                            striped
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
                            
                        />

            </Card>
        </>
    )
}

export default MotorsCertified
