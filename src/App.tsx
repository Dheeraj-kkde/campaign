import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CampaignSetup from "../src/components/CampaignSetup/CampaignSetup";

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CampaignSetup />
    </LocalizationProvider>
  );
}
