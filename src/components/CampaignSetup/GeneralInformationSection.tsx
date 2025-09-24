import React from "react";
import {
  Grid,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import InfoIcon from "@mui/icons-material/Info";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ mb: 3, display: "flex", alignItems: "center", fontWeight: 500 }}
      >
        General Information
        <InfoIcon sx={{ ml: 1, fontSize: 20, color: "grey.500" }} />
      </Typography>
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Campaign Name"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="e.g. Journey Insights"
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. This campaign delves deep into the personal narratives..."
            sx={{ mb: 1.5 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
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
                  >
                    <OpenInFullIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

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

        <Grid item xs={12} md={6}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newVal: Dayjs | null) => setDates(newVal, endDate)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newVal: Dayjs | null) => setDates(startDate, newVal)}
                slotProps={{ textField: { fullWidth: true } }}
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
    </Box>
  );
};

export default GeneralInformationSection;
