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
import {  fetchStock} from '../../../../api/request'

const Stock = () => {
    const { state } = useLocation();
    const navigate = useNavigate()
    const [isLoading , setIsLoading] = React.useState(false)
    const [search , setSearch] = React.useState('')
    const [motors , setMotors] = React.useState(state?.motors ?? [])

    const onClickRow = (row , action = null) => {
        navigate(`/stock/edit`, {state: {uuid: row.uuid}})
    }
    useEffect(() => {
        
        const _motors = state?.motors?.filter((motor) => {
            return motor?.numero_serie?.toLowerCase().match(search?.toLowerCase())
        })
        console.log(_motors)
        setMotors(_motors)
    }, [search])
    return (
<>
            <PageHeader title="Stock">
                <div className="offset-sm-10 col-sm-8">
                <Button
                    className="mr-2"
                    variant="dark"
                    size="md"
                    onClick={() => navigate(-1)}
                >
                    <i className="zmdi zmdi-accounts-list-alt"></i> Retour à la
                    liste
                </Button>
                <Button
                    variant="primary"
                    onClick={() => navigate('/admins/stock/add')}
                >
                    Ajouter un stock 
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
                            
                        />
                    </>
                
                    
               
                <ReactTooltip id="tooltip" />
            </Card>
       </>
    )
}

export default Stock
