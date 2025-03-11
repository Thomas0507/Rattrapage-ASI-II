import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import SnackbarValidation from '../../components/SnackbarValidation';

const SOCKET_SERVER_URL = 'http://localhost:3000/notif'; // Connexion au namespace /notif

const NotifComponent = () => {
    const [validationMessage, setValidationMessage] = useState<string>("");
    const [validationOpen, setValidationOpen] = useState<boolean>(false);

    const socketRef = useRef<Socket>(null)

    useEffect(() => {
        if (socketRef.current === null) {
            socketRef.current = io(SOCKET_SERVER_URL)
            socketRef.current.connect();
            socketRef.current.emit("register", "test2");
            socketRef.current.on('notification', (data) => {
                setValidationMessage(data.message);
                setValidationOpen(true);
            });
        }

        if (socketRef.current !== null) {
            // event to emit all time
        }

        return () => {
            if (socketRef.current !== null ) {
                socketRef.current.disconnect();
            }
        }
    }, []);

    return (
        <div>
        <SnackbarValidation
            open={validationOpen}
            setOpen={setValidationOpen}
            message={validationMessage}
        />
        </div>
    );
};

export default NotifComponent;