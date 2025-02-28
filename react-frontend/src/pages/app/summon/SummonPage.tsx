import { Box, Button, Container, MobileStepper, Pagination, Stack } from "@mui/material"
import React from "react"
import BannerCard from "../../../components/BannerCard";
import { Banner } from "../../../models/Banner";
import { Card } from "../../../models/Card";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import '../../../css/SummonPage.css'


export default function SummonPage() {

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

    const data = [new Banner(1, 'test', 'desc', 0, true, new Date(), new Date(), true, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1623730/c961ac047294838bfe382bf193ade5c64b19e573/capsule_616x353.jpg?t=1737094038", [new Card
        (
            1, "Lamball", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral"
        )
    ], [new Card(
        1, "Lamball2", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral"
    )]),
    new Banner(2, 'test2', 'desc2', 0, true, new Date(), new Date(), true, "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1623730/c961ac047294838bfe382bf193ade5c64b19e573/capsule_616x353.jpg?t=1737094038", [new Card
        (
            1, "Lamball", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral"
        )
    ], [new Card(
        1, "Lamball2", "A simple sheep trying his best", "https://paldex.io/cdn-cgi/image/format=auto,width=300/images/pal-icons/T_SheepBall_icon_normal.png", 1, 1, "Neutral"
    )])
];

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
            <ArrowBackIosIcon/>
          Back
        </Button>
      }
    />
    <BannerCard banner={data[activeStep]} />
    </Container>
    )
}
