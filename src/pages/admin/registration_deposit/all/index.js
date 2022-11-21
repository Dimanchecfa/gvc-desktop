import React, { useEffect } from 'react'
import { Button, Card, Spinner } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../../../layouts/components/page-header'
import NotDataBox from "../../../../components/no-data";
import PaginationPage from "../../../../components/paginate";
import { errorNotif } from '../../../../components/notification'
import Searcher from '../../../../components/data-table-search'
import ReactTooltip from 'react-tooltip'
import {  fetchLots, fetchSales, fetchStock} from '../../../../api/request'
import tableColums from './data'

const Stock = () => {
    const navigate = useNavigate()
    const [isLoading , setIsLoading] = React.useState(false)
    const [lots , setLots] = React.useState([])
    const [search , setSearch] = React.useState('')

    useEffect(() => {
        (async () => await fetchRegistredLot())()
    }, [search])


    const fetchRegistredLot = async () => {
        try {
            setLots([])
            setIsLoading(true);
            const response = await fetchLots();
            const dataReceive = response?.data ?? null;
            const _lots = dataReceive?.data ?? [];
            console.log(_lots)
            const filterdLot = _lots?.filter((data) => {
                return (data?.numero_lot?.toLowerCase().match(search?.toLowerCase()) 
                || data?.nom_depositeur?.toLowerCase().match(search?.toLowerCase())
                || data?.numero_depositeur?.toLowerCase().match(search?.toLowerCase()))
            })
            if (_lots?.length > 0) {
                setLots(filterdLot);
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

    const onClickRow = (row , action = null) => {
        navigate(`/lot/details`, {state: {uuid: row.uuid , registrations : row.registrations}})
    }

    return (
<>
            <PageHeader title="Stock">
                <div className="offset-sm-10 col-sm-9">
                <Button
                    className="mr-2"
                    variant="primary"
                    size="md"
                    onClick={() => navigate('/lot/add')}
                > 
                Ajouter un lot
                </Button>
                </div>
            </PageHeader>
            <Card body>
                
                    <>
                        <DataTable
                            columns={tableColums(onClickRow)}
                            data={lots}
                            title={
                                <Searcher
                                    placeholder={"Entrer le numéro du journal"}
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}
                                />
                            }
                            onRowClicked={onClickRow}
                            progressComponent={<Spinner />}
                            highlightOnHover
                            pagination
                            pointerOnHover
                            noDataComponent={
                                isLoading ? (
                                    <Spinner />
                                ) : (
                                    <NotDataBox
                                        message={
                                            "Aucune vente n'a été trouvée"
                                        }
                                    />
                                )
                            }
                            
                        />
                    </>
                    
               
                <ReactTooltip id="tooltip" />
            </Card>
       </>
    )
}

export default Stock
