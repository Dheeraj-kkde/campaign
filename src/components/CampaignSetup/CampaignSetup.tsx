import React, { useState } from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import GeneralInformationSection from "./GeneralInformationSection";
import AgentInstructionsSection from "./AgentInstructionsSection";
import InviteParticipantsModal from "./InviteParticipantsModal";
import DescriptionExpandModal from "./DescriptionExpandModal";

const outlinedButtonSx = {
  borderColor: "#1e49e2",
  textTransform: "none",
  color: "#1e49e2",
  borderRadius: 5,
  "&:hover": {
    borderColor: "#1e49e2",
    backgroundColor: "rgba(26, 40, 193, 0.04)",
  },
} as const;

const containedButtonSx = {
  borderColor: "#1e49e2",
  textTransform: "none",
  color: "white",
  backgroundColor: "#1e49e2",
  borderRadius: 5,
  "&:hover": {
    borderColor: "#1e49e2",
    color: "white",
    backgroundColor: "rgba(30, 73, 226)",
  },
} as const;

const CampaignSetup: React.FC = () => {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [descOpen, setDescOpen] = useState(false);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Campaign Setup
      </Typography>

      <GeneralInformationSection
        onOpenInvite={() => setInviteOpen(true)}
        onOpenDesc={() => setDescOpen(true)}
      />

      <Divider sx={{ my: 4, borderColor: "grey.400" }} />

      <AgentInstructionsSection />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" sx={outlinedButtonSx}>
            Cancel
          </Button>
          <Button variant="outlined" sx={outlinedButtonSx}>
            Save Draft
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" sx={containedButtonSx}>
            Preview
          </Button>
          <Button variant="contained" color="primary" sx={containedButtonSx}>
            Publish
          </Button>
        </Box>
      </Box>

      <InviteParticipantsModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
      />
      <DescriptionExpandModal
        open={descOpen}
        onClose={() => setDescOpen(false)}
      />
    </Box>
  );
};

export default CampaignSetup;
