import { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import Loader from "../Loader";
import { generateCard } from "../../api/card";

export default function Generator() {



    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [prompt, setPrompt] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState("");

    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name || !prompt || !termsAccepted) {
            setError(
                "Please fill in all fields and accept the terms and conditions.",
            );
            return;
        }

        setError("");
        setLoading(true);

        try {
            const newCard = { name, prompt };
            console.log("newCard: ", newCard);
            let a = await generateCard(name, prompt);
            console.log(a);
            // toast.success("The generation of your card has started.");

            setName("");
            setPrompt("");
            setTermsAccepted(false);
        } catch {
            // toast.success("An error occured, try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <Box>
                <Typography variant="h5" component="h1" align="center" gutterBottom>
                    Generate Your Card
                </Typography>
                {error && (
                    <Alert sx={{ mt: 4 }} severity="error">
                        {error}
                    </Alert>
                )}
                <form onSubmit={submit}>
                    <TextField
                        multiline
                        rows={2}
                        maxRows={4}
                        fullWidth
                        label="Card Name"
                        variant="outlined"
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        multiline
                        rows={2}
                        maxRows={4}
                        fullWidth
                        label="Prompt"
                        variant="outlined"
                        margin="normal"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <Box>
                        <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                        />
                        <label style={{ marginLeft: 8 }}>
                            I accept the terms and conditions
                        </label>
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Generate Card
                    </Button>
                </form>
            </Box>
            {loading && <Loader overlay={loading} />}
        </Container>
    );
}