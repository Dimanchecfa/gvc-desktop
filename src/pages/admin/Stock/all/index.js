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
import {  fetchStock} from '../../../../api/request'

const Stock = () => {
    const navigate = useNavigate()
    const [isLoading , setIsLoading] = React.useState(false)
    const [stock , setStock] = React.useState([])
    const [search , setSearch] = React.useState('')

    useEffect(() => {
        (async () => await fetchStockData())()
    }, [search])


    const fetchStockData = async (page) => {
        try {
            const params = {
                search: search,
            };
            setStock([])
            setIsLoading(true);
            const response = await fetchStock();
            const dataReceive = response?.data ?? null;
            const _stock = dataReceive?.data ?? [];
            console.log(_stock)
            const filterdStock = _stock?.filter((stock) => {
                return stock?.numero?.toLowerCase().match(search?.toLowerCase())
            })
            if (_stock?.length > 0) {
                setStock(filterdStock);
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
                <div className="offset-sm-10 col-sm-9">
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
                            data={stock}
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
                                            "Aucun stock n'a été trouvé"
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
