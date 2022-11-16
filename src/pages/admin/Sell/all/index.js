import React, { useEffect } from 'react'
import { Button, Card, Spinner } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../../../layouts/components/page-header'
import tableColums from './data'
import NotDataBox from "../../../../components/no-data";
import PaginationPage from "../../../../components/paginate";
import { errorNotif } from '../../../../components/notification'
import Searcher from '../../../../components/data-table-search'
import ReactTooltip from 'react-tooltip'
import {  fetchSales, fetchStock} from '../../../../api/request'

const Stock = () => {
    const navigate = useNavigate()
    const [isLoading , setIsLoading] = React.useState(false)
    const [sales , setSales] = React.useState([])
    const [search , setSearch] = React.useState('')

    useEffect(() => {
        (async () => await fetchSalesData())()
    }, [search])


    const fetchSalesData = async () => {
        try {
            setSales([])
            setIsLoading(true);
            const response = await fetchSales();
            const dataReceive = response?.data ?? null;
            const _sales = dataReceive?.data ?? [];
            console.log(_sales)
            const filterdSell = _sales?.filter((sale) => {
                return (sale?.numero_facture?.toLowerCase().match(search?.toLowerCase()) 
                || sale?.moto.modele?.toLowerCase().match(search?.toLowerCase())
                || sale?.nom_client?.toLowerCase().match(search?.toLowerCase()))
            })
            if (_sales?.length > 0) {
                setSales(filterdSell);
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
        navigate(`/stock/details`, {state: {uuid: row.uuid , motors : row.moto}})
    }

    return (
<>
            <PageHeader title="Stock">
                <div className="offset-sm-10 col-sm-8">
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
                            data={sales}
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
