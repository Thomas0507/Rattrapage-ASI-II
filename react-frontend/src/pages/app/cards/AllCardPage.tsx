import React, { useEffect, useState } from "react";
import CardListComponent from "../../../components/CardListComponent";
import { getOptionsByRequestType, RequestType } from "../../../hooks/RequestBuilder";
import { useLocation } from "react-router-dom";
import { TablePagination } from "@mui/material";

function AllCardPage () {
    const path = useLocation().pathname.split("/");
    const cardId = Number(path[path.length-1]);
    
    // const mockCard = new Card(1, "Lamball", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral");
    const [cards, setCard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [maxPage, setMaxPage] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/cards?page=` + page  + '&size=' + rowsPerPage, getOptionsByRequestType(RequestType.GET, {}) )
                const maxPageResponse = await fetch(`http://localhost:8081/cards/getNbCards`, getOptionsByRequestType(RequestType.GET));
                if (!response.ok) {
                    throw new Error(`Error: $(response.statusText)`);
                }
                if (!maxPageResponse.ok) {
                    throw new Error(`Error: can't find cards`)
                }
                // todo: handle card not found
                const result = await response.json();
                const maxNbPage = await maxPageResponse.json();
                setCard(result);
                setMaxPage(maxNbPage);
            } catch(err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page, rowsPerPage])



    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    if (loading) return <p> loading</p> 
    if (error) return <p>Error: {error}</p>
    return (
        <div>
                        <TablePagination
                component="div"
                count={maxPage}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        <CardListComponent cards={cards}/>

        </div>
    )

}

export default AllCardPage;