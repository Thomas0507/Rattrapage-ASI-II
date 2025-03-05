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
import ErrorComponent from "../../../components/ErrorComponent";


export default function SummonPage() {

    

    const [activeStep, setActiveStep] = useState(0);
    const [data, setData] = useState([new Banner(0, '', '', 0, false, new Date(), new Date(), false, '', [], [])]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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
                const response = await fetch(`http://localhost:8081/banner/active`, getOptionsByRequestType(RequestType.GET, {}) )
                if (!response.ok) {
                    return response.text().then( text => {
                      setError(true);
                      setErrorMessage(text);}
                  );
                }
                const result = await response.json();
                setData(result);
            } catch(err) {
                setError(true);
                setErrorMessage(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
    <Container className="component-padding" maxWidth="lg">
      {
        isLoading ? ( <Loader/>) :
        ( <div>
          { error ? (<ErrorComponent message={errorMessage}/>) :
            (
              <div>
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
              </div> 
            )
          }
        </div>
        )

      }
    </Container>
    );
}
