import { Button, Card, Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const BackButton = () => {
    const navigate = useNavigate()
    return (
        <>
        <Button
            className="mr-2"
            variant="dark"
            size="md"
            onClick={() => navigate(-1)}
        >
            <i className="zmdi zmdi-accounts-list-alt"></i> {`Retour à la liste`}
        </Button>
        </>
    )
}