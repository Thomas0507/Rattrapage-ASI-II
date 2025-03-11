import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Loader from "../pages/Loader";

export type TableItem = {
    sessionId: string;
    currentNbPlayers: number;
    status: string;
    capacity: number;
    roomName: string
  };
  
  type ScrollableTableComponentProps = {
    items: TableItem[];
    loading: boolean
};
  
  
  const ScrollableTableComponent: React.FC<ScrollableTableComponentProps> = ({ items, loading}) => {
    
    const handleRedirect = (sessionId: string) => {
        window.location.href += `/session/${sessionId}`;
    }
    if (loading) {}
  
    return (
      <TableContainer component={Paper} sx={{ maxHeight: 300, overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>UUID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Nb Player</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {
                loading ? (
                    <TableBody>
                        <TableCell colSpan={5} align="center">
                            <Loader/>
                        </TableCell>
                    </TableBody> 
                ) : (
                    <TableBody>
                    {
                        items.length === 0 ? (
                        <TableCell colSpan={5} align="center">
                            No rooms available right now
                        </TableCell>
                        ) : 
                        (
                            items.map((item, index) => (
                                <TableRow key={item.sessionId} sx={{ bgcolor: index % 2 === 0 ? "grey.200" : "grey.300" }}>
                                  <TableCell>{item.sessionId}</TableCell>
                                  <TableCell>{item.roomName}</TableCell>
                                  <TableCell>{item.currentNbPlayers}</TableCell>
                                  <TableCell>{item.status}</TableCell>
                                  <TableCell>{item.capacity}</TableCell>
                                  <TableCell>
                                  <IconButton onClick={() => handleRedirect(item.sessionId)}>
                                    <OpenInNewIcon />
                                  </IconButton>
                                </TableCell>
                                </TableRow>
                              ))
                        )}
                      </TableBody>                    
                )
            }
        </Table>
      </TableContainer>
    );
  };
  
  export default ScrollableTableComponent;