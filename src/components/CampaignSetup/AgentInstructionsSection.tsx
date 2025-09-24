import React from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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

  // shared label style to match other sections
  const labelSx = {
    mb: 1,
    color: "text.primary",
    fontWeight: 500,
    fontSize: "0.875rem", // 14px
    lineHeight: 1.2,
  };
  const outlinedTextFieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#1E49E2",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#1E49E2",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      transition: "border-color 0.2s ease",
    },
  };

  // icon styles to vertically align the circular "i" with the label text
  const iconButtonSx = { ml: 1, p: 0.5 };
  const headerIconSx = {
    fontSize: 20,
    color: indigo["A700"],
    // transform: "translateY(-2px)",
  };
  const smallIconSx = {
    fontSize: 15,
    color: indigo["A700"],
    transform: "translateY(-5px)",
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ mb: 3, display: "flex", alignItems: "center", fontWeight: 500 }}
      >
        Agent Instructions
        <Tooltip title="Instructions for the automated agent & prompts">
          <IconButton
            aria-label="Agent instructions help"
            size="small"
            sx={iconButtonSx}
          >
            <InfoOutlinedIcon sx={headerIconSx} />
          </IconButton>
        </Tooltip>
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={labelSx}>
              Interview Prompt
            </Typography>
            <Tooltip title="Describe the interview questions and objectives">
              <IconButton
                aria-label="Interview prompt help"
                size="small"
                sx={iconButtonSx}
              >
                <InfoOutlinedIcon sx={smallIconSx} />
              </IconButton>
            </Tooltip>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={3}
            value={interviewPrompt}
            onChange={(e) => setInterviewPrompt(e.target.value)}
            sx={{ mb: 3, ...outlinedTextFieldSx }}
          />

          <Grid container spacing={2}>
            {starterPrompts.interview.map((p, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <StarterPromptCard
                  prompt={p}
                  onUse={(pt) => setInterviewPrompt(pt)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={labelSx}>
              Outcome Prompt
            </Typography>
            <Tooltip title="Describe desired output for the interview recap">
              <IconButton
                aria-label="Outcome prompt help"
                size="small"
                sx={iconButtonSx}
              >
                <InfoOutlinedIcon sx={smallIconSx} />
              </IconButton>
            </Tooltip>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={3}
            value={outcomePrompt}
            onChange={(e) => setOutcomePrompt(e.target.value)}
            sx={{ mb: 3, ...outlinedTextFieldSx }}
          />

          <Grid container spacing={2}>
            {starterPrompts.outcome.map((p, i) => (
              <Grid item xs={12} sm={6} key={i}>
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
