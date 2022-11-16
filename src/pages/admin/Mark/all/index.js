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
import {  fetchCommercials, fetchStock} from '../../../../api/request'

const Stock = () => {
    const navigate = useNavigate()
    const [isLoading , setIsLoading] = React.useState(false)
    const [commercial , setCommercial] = React.useState([])
    const [search , setSearch] = React.useState('')

    useEffect(() => {
        (async () => await fetchCommercialData())()
    }, [search])


    const fetchCommercialData = async (page) => {
        try {
            setCommercial([])
            setIsLoading(true);
            const response = await fetchCommercials();
            const dataReceive = response?.data ?? null;
            const _commercial = dataReceive?.data ?? [];
            console.log(_commercial)
            const filterdCommercial = _commercial?.filter((data) => {
                return data?.pseudo?.toLowerCase().match(search?.toLowerCase())
            })
            if (_commercial?.length > 0) {
                setCommercial(filterdCommercial);
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
                            data={commercial}
                            title={
                                <Searcher
                                    placeholder={"Entrer le nom du commercial"}
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
                                            "Aucun commercial n'a été trouvé"
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
