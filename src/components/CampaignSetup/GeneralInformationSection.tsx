import React from "react";
import {
  Grid,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import InfoIcon from "@mui/icons-material/Info";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs, { Dayjs } from "dayjs";
import InlineParticipantsChips from "./InlineParticipantsChips";
import { useCampaignStore } from "../../store/campaignStore";

interface Props {
  onOpenInvite: () => void;
  onOpenDesc: () => void;
}

const GeneralInformationSection: React.FC<Props> = ({
  onOpenInvite,
  onOpenDesc,
}) => {
  const campaignName = useCampaignStore((s) => s.campaignName);
  const setCampaignName = useCampaignStore((s) => s.setCampaignName);
  const description = useCampaignStore((s) => s.description);
  const setDescription = useCampaignStore((s) => s.setDescription);

  const startDate = useCampaignStore((s) => s.startDate);
  const endDate = useCampaignStore((s) => s.endDate);
  const setDates = useCampaignStore((s) => s.setDates);
  const participantInstructions = useCampaignStore(
    (s) => s.participantInstructions
  );
  const setParticipantInstructions = useCampaignStore(
    (s) => s.setParticipantInstructions
  );

  // local microinteraction: show alert when a field is cleared
  const [clearedMsg, setClearedMsg] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (clearedMsg) {
      const t = window.setTimeout(() => setClearedMsg(null), 1500);
      return () => window.clearTimeout(t);
    }
    return;
  }, [clearedMsg]);

  return (
    <Box sx={{ position: "relative" }}>
      <Typography
        variant="h6"
        sx={{ mb: 3, display: "flex", alignItems: "center", fontWeight: 500 }}
      >
        General Information
        <InfoIcon sx={{ ml: 1, fontSize: 20, color: "grey.500" }} />
      </Typography>

      {/*
        alignItems="flex-start" is key so both columns start on the same vertical baseline.
        We render labels above inputs consistently (Typography) so left and right match.
      */}
      <Grid container spacing={4} sx={{ mb: 4 }} alignItems="flex-start">
        {/* LEFT */}
        <Grid item xs={12} md={6}>
          {/* Campaign Name label above the input */}
          <Typography
            variant="body2"
            sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
          >
            Campaign Name
          </Typography>

          <TextField
            fullWidth
            placeholder="e.g. Journey Insights"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            sx={{ mb: 3 }}
            variant="outlined"
          />

          {/* Description label above the input */}
          <Typography
            variant="body2"
            sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
          >
            Description
          </Typography>

          {/* wrapper to position the expand icon at bottom-right inside the field */}
          <Box sx={{ position: "relative", mb: 2 }}>
            <TextField
              fullWidth
              placeholder="e.g. This campaign delves deep into the personal narratives..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              variant="outlined"
              sx={{
                // provide space on the right so content doesn't sit under the icon
                pr: "56px",
              }}
            />

            {/* absolute positioned expand icon at bottom-right of the textarea */}
            <IconButton
              aria-label="Expand description"
              size="small"
              onClick={onOpenDesc}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpenDesc();
                }
              }}
              tabIndex={0}
              sx={{
                position: "absolute",
                right: 8,
                bottom: 8,
                backgroundColor: "background.paper",
                borderRadius: 1,
                boxShadow: 1,
                "&:hover": { transform: "scale(1.03)" },
                zIndex: 3,
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <OpenInFullIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography
            variant="body1"
            sx={{
              mb: 1,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
            }}
          >
            Invite Participants{" "}
            <InfoIcon sx={{ ml: 1, fontSize: 16, color: "grey.500" }} />
          </Typography>

          <TextField
            fullWidth
            placeholder="Enter emails or click to manage participants"
            value={""}
            onFocus={onOpenInvite}
            onClick={onOpenInvite}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={onOpenInvite}
                    size="small"
                    aria-label="Open invite participants"
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,
              cursor: "pointer",
              "& .MuiInputBase-input": { cursor: "pointer" },
            }}
          />

          <InlineParticipantsChips onOpenInvite={onOpenInvite} />
        </Grid>

        {/* RIGHT */}
        <Grid item xs={12} md={6}>
          {/*
            Render labels above each date picker to match left-side label rhythm.
            That ensures Start Date aligns horizontally with the Campaign Name input.
          */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
              >
                Start Date
              </Typography>

              <DesktopDatePicker
                value={startDate}
                onChange={(newVal: Dayjs | null) => setDates(newVal, endDate)}
                slotProps={{
                  field: {
                    clearable: true,
                    onClear: () => setClearedMsg("Start date cleared!"),
                  } as any,
                  textField: { fullWidth: true },
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="body2"
                sx={{ mb: 1, color: "text.primary", fontWeight: 500 }}
              >
                End Date
              </Typography>

              <DesktopDatePicker
                value={endDate}
                onChange={(newVal: Dayjs | null) => setDates(startDate, newVal)}
                slotProps={{
                  field: {
                    clearable: true,
                    onClear: () => setClearedMsg("End date cleared!"),
                  } as any,
                  textField: { fullWidth: true },
                }}
              />
            </Grid>
          </Grid>

          <Typography
            variant="body1"
            sx={{
              mb: 1,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
            }}
          >
            Participant Instructions{" "}
            <InfoIcon sx={{ ml: 1, fontSize: 16, color: "grey.500" }} />
          </Typography>

          <Box>
            <TextField
              fullWidth
              multiline
              rows={10}
              value={participantInstructions}
              onChange={(e) => setParticipantInstructions(e.target.value)}
              placeholder="Add instructions or notes for your interview participants to read before beginning the interview"
              variant="outlined"
            />
          </Box>
        </Grid>
      </Grid>

      {/* small floating alert in the bottom-right of this section */}
      {clearedMsg && (
        <Alert
          severity="success"
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            boxShadow: 3,
            borderRadius: 1,
          }}
        >
          {clearedMsg}
        </Alert>
      )}
    </Box>
  );
};

export default GeneralInformationSection;
