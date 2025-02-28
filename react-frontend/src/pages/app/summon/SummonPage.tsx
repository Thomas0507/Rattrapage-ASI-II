import { Box, Button, Container, MobileStepper, Pagination, Stack } from "@mui/material"
import React, { useEffect, useState } from "react"
import BannerCard from "../../../components/BannerCard";
import { Banner } from "../../../models/Banner";
import { Card } from "../../../models/Card";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import '../../../css/SummonPage.css'
import { getOptionsByRequestType, RequestType } from "../../../hooks/RequestBuilder";
import Loader from "../../Loader";


export default function SummonPage() {

    

    const [activeStep, setActiveStep] = useState(0);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [isLoading, setLoading] = useState(true); 

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/banner`, getOptionsByRequestType(RequestType.GET, {}) )
                if (!response.ok) {
                    throw new Error(`Error: $(response.statusText)`);
                }
                // todo: handle banners not found
                const result = await response.json();
                setData(result);
            } catch(err) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);






// mock data
//     const data = [new Banner(1, 'test', 'desc', 0, true, new Date(), new Date(), true, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1623730/c961ac047294838bfe382bf193ade5c64b19e573/capsule_616x353.jpg?t=1737094038", [new Card
//         (
//             1, "Lamball", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral"
//         )
//     ], [new Card(
//         1, "Lamball2", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral"
//     )]),
//     new Banner(2, 'test2', 'desc2', 0, true, new Date(), new Date(), true, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1623730/c961ac047294838bfe382bf193ade5c64b19e573/capsule_616x353.jpg?t=1737094038", [new Card
//         (
//             1, "Lamball", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral"
//         )
//     ], [new Card(
//         1, "Lamball2", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral"
//     )])
// ];

    if (isLoading) return <Loader />
    return (
    <Container maxWidth="lg">
        <MobileStepper
      variant="dots"
      steps={data.length}
      position="static"
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1, marginLeft: 'auto', marginRight: 'auto' }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === data.length - 1}>
            <NavigateNextIcon/>
          Next
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeftIcon/>
          Back
        </Button>
      }
    />
    <BannerCard banner={data[activeStep]} />
    </Container>
    );
}
