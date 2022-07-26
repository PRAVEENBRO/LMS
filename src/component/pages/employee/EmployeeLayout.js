import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RouterComponent from "../../routes/RouterComponent";
import { useNavigate } from "react-router-dom";
import EmployeeRoute from "../../routes/EmployeeRoute";
import EmpSubmitPage from "./submitPage/EmpSubmitPage";
import { WindowSharp } from "@mui/icons-material";
import ButtonComponent from "../../atom/ButtonComponent";

const steps = [
  { name: "Primary Info", to: "/primaryInfo" },
  { name: "Secondary Info", to: "/secondaryInfo" },
  { name: "Education Details", to: "/educationDetails" },
  { name: "Address Details", to: "/addressDetails" },
  { name: "Bank Details", to: "/bankDetails" },
  { name: "Techniocal Skills", to: "/technicalSkills" },
  { name: "Experience", to: "/experience" },
  { name: "Contact", to: "/contact" },
];

function EmployeeLayout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [empPayload, setEmpPayload] = React.useState("Rohan");
  const [submitPage, setSubmitPage] = React.useState(false);
  const history = useNavigate();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    let path = "";
    steps.map((item, index) => {
      if (index === newActiveStep) {
        path = item.to;
      }
    });
    history(path);
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    let newActiveStep = activeStep - 1;
    let path = "";
    steps.map((item, index) => {
      if (index === newActiveStep) {
        path = item.to;
      }
    });
    history(path);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step, path) => () => {
    history(path);
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    history("/primaryInfo");
  };

  const handleSubmit = () => {
    setSubmitPage(true);
  };
  return (
    <div className="m-5">
      {" "}
      <Box sx={{ width: "100%" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label.name} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index, label.to)}>
                {label.name}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <div>
              { submitPage && <EmpSubmitPage
                  submitPage={submitPage}
                  setSubmitPage={setSubmitPage}
                />}
              </div>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <ButtonComponent
                  style={{
                    backgroundColor: "#086288",
                    color: "#FFFFFF",
                    Fontfamily: "Open Sans, Semibold",
                  }}
                  size="large"
                  label="Reset"
                  onClick={handleReset}
                >
                  Reset
                </ButtonComponent>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* <Typography sx={{ mt: 2, mb: 1 }}>
                Step {activeStep + 1}
              </Typography> */}
              <Box>
                <EmployeeRoute
                  setEmpPayload={setEmpPayload}
                  empPayload={empPayload}
                  handleNextClick={handleComplete}
                  handlePreviousClick={handleBack}
                  completedSteps={completedSteps}
                  totalSteps={totalSteps}
                  submitPage={submitPage}
                  setSubmitPage={setSubmitPage}
                  allStepsCompleted={allStepsCompleted}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                {/* <Button
                  variant="contained"
                  style={{
                    background: "#086288",
                    color: "white",
                    marginLeft: "150px",
                  }}
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Previous
                </Button> */}
                {/* <Box className="col-8" /> */}
                {/* <Button
                  variant="contained"
                  style={{ background: "#086288" }}
                  onClick={handleNext}
                  sx={{ mr: 1 }}
                >
                  Next
                </Button> */}
                {/* {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "inline-block" }}
                    >
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button
                      variant="contained"
                      style={{ background: "#086288" }}
                      onClick={
                        completedSteps() === totalSteps() - 1
                          ? handleSubmit
                          : handleComplete
                      }
                    >
                      {completedSteps() === totalSteps() - 1
                        ? "Submit"
                        : "Next"}
                    </Button>
                  ))} */}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
    </div>
  );
}

export default EmployeeLayout;
