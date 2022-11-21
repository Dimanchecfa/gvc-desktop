import React, { useEffect } from 'react'
import { Button, Card, Spinner } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { useLocation, useNavigate } from 'react-router-dom'
import PageHeader from '../../../../layouts/components/page-header'
import tableColums from './data'
import NotDataBox from "../../../../components/no-data";
import PaginationPage from "../../../../components/paginate";
import { errorNotif } from '../../../../components/notification'
import Searcher from '../../../../components/data-table-search'
import ReactTooltip from 'react-tooltip'
import { getMotorsByStockId } from '../../../../api/request'

const Stock = () => {
    const { state } = useLocation();
    console.log(state)
    const navigate = useNavigate()
    const [isLoading , setIsLoading] = React.useState(false)
    const [search , setSearch] = React.useState('')
    const [motors , setMotors] = React.useState(state?.moto ?? [])

    const onClickRow = (row , action = null) => {
        navigate(`/motors/edit`, {state: row})
    }
    useEffect(() => {
        (async () => await fetchMotors())()
    }, [search])


      const fetchMotors = async (page) => {
        try {
            const response = await getMotorsByStockId(state?.id);
            const dataReceive = response?.data ?? null;
            const _motors = dataReceive?.data ?? [];
            console.log(_motors)
            const filterdMotors = _motors?.filter((motor) => {
                return motor?.numero_serie?.toLowerCase().match(search?.toLowerCase())
            })
            if (_motors?.length > 0) {
                setMotors(filterdMotors);
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

    return (
<>
            <PageHeader title={
                `Details du stock ${state?.numero}`
            }>
                <div className="offset-sm-7 col-sm-8">
                <Button
                    className="mr-2"
                    variant="dark"
                    size="md"
                    onClick={() => navigate('/stock')}
                >
                    <i className="zmdi zmdi-accounts-list-alt"></i> Retour
                </Button>
                <Button
                 className="mr-2"
                    variant="primary"
                    onClick={() => navigate('/motors/add' , {state: {id: state?.id , numero: state?.numero}})}
                >
                    Ajouter une moto
                </Button>
                <Button
                className="mr-2"
                    variant="success"
                    onClick={() => navigate('/stock/edit' , {state: state})}
                >
                    Modifier
                </Button>
                <Button
                    
                    variant="danger"
                    onClick={() => navigate('/motors/add' , {state: {id: state?.id , numero: state?.numero}})}
                >
                   Supprimer
                </Button>
                </div>
            </PageHeader>
            <Card body>
                
                    <>
                        <DataTable
                            columns={tableColums(onClickRow)}
                            data={motors}
                            title= {
                                <Searcher
                                    placeholder={"Entrer le numéro du journal"}
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                />
                            }
                            onRowClicked={onClickRow}
                            progressComponent={<Spinner />}
                            highlightOnHover
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
