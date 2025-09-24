import React from "react";
import { Box, Grid, TextField, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import StarterPromptCard from "./StarterPromptCard";
import { useCampaignStore } from "../../store/campaignStore";

const AgentInstructionsSection: React.FC = () => {
  const interviewPrompt = useCampaignStore((s) => s.interviewPrompt);
  const setInterviewPrompt = useCampaignStore((s) => s.setInterviewPrompt);
  const outcomePrompt = useCampaignStore((s) => s.outcomePrompt);
  const setOutcomePrompt = useCampaignStore((s) => s.setOutcomePrompt);

  const starterPrompts = {
    interview: ["Sample Prompt 1...", "Sample Prompt 2..."],
    outcome: ["Sample Outcome 1...", "Sample Outcome 2..."],
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ mb: 3, display: "flex", alignItems: "center", fontWeight: 500 }}
      >
        Agent Instructions
        <InfoIcon sx={{ ml: 1, fontSize: 20, color: "grey.500" }} />
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
            Interview Prompt
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={interviewPrompt}
            onChange={(e) => setInterviewPrompt(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Grid container spacing={2}>
            {starterPrompts.interview.map((p, i) => (
              <Grid item xs={6} key={i}>
                <StarterPromptCard
                  prompt={p}
                  onUse={(pt) => setInterviewPrompt(pt)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
            Outcome Prompt
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={outcomePrompt}
            onChange={(e) => setOutcomePrompt(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Grid container spacing={2}>
            {starterPrompts.outcome.map((p, i) => (
              <Grid item xs={6} key={i}>
                <StarterPromptCard
                  prompt={p}
                  onUse={(pt) => setOutcomePrompt(pt)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AgentInstructionsSection;
