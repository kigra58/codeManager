import Step1TripInfo from "../components/FormSteps/Step1TripInfo";
import Step2Documents from "../components/FormSteps/Step2Documents";
import Step3DriverDetails from "../components/FormSteps/Step3DriverDetails";
import Step4Declaration from "../components/FormSteps/Step4Declaration";
import Step5Review from "../components/FormSteps/Step5Review";

export const API_BASE_URL = "http://localhost:8003";

export const FORM_STEPS = [
    {
        id: 1,
        title: "Trip Information",
        component: Step1TripInfo,
    },
    {
        id: 2,
        title: "Documents",
        component: Step2Documents,
    },
    {
        id: 3,
        title: "Driver Details",
        component: Step3DriverDetails,
    },
    {
        id: 4,
        title: "Declaration",
        component: Step4Declaration,
    },
    {
        id: 5,
        title: "Review",
        component: Step5Review,
    },
];