import React from "react";
import {
  Grid,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  Alert,
  Tooltip,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Dayjs } from "dayjs";
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

  // unified label style for consistent typography across fields
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
    <Box sx={{ position: "relative" }}>
      <Typography
        variant="h6"
        sx={{ mb: 3, display: "flex", alignItems: "center", fontWeight: 500 }}
      >
        General Information
        <Tooltip title="General Information helps group the campaign's core fields">
          <IconButton
            aria-label="General information help"
            size="small"
            sx={iconButtonSx}
          >
            <InfoOutlinedIcon sx={headerIconSx} />
          </IconButton>
        </Tooltip>
      </Typography>

      <Grid container spacing={4} sx={{ mb: 4 }} alignItems="flex-start">
        {/* LEFT */}
        <Grid item xs={12} md={6}>
          {/* Campaign Name label above the input */}
          <Typography variant="body2" sx={labelSx}>
            Campaign Name
          </Typography>

          <TextField
            fullWidth
            placeholder="e.g. Journey Insights"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            sx={{
              mb: 3,
              ...outlinedTextFieldSx,
            }}
            variant="outlined"
          />

          {/* Description label above the input */}
          <Typography variant="body2" sx={labelSx}>
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
                ...outlinedTextFieldSx,
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
                border: "none",
                // backgroundColor: "background.paper",
                // borderRadius: 1,
                // boxShadow: 1,
                "&:hover": { transform: "scale(1.03)" },
                zIndex: 3,
              }}
            >
              <OpenInFullIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Invite Participants label (no tooltip) */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="body2" sx={labelSx}>
              Invite Participants
            </Typography>
            {/* intentionally no tooltip or icon here per request */}
          </Box>

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
              ...outlinedTextFieldSx,
            }}
          />

          <InlineParticipantsChips onOpenInvite={onOpenInvite} />
        </Grid>

        {/* RIGHT */}
        <Grid item xs={12} md={6}>
          {/* Render labels above date pickers with the same label style */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <Typography variant="body2" sx={labelSx}>
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
                  textField: { fullWidth: true, sx: outlinedTextFieldSx },
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" sx={labelSx}>
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
                  textField: { fullWidth: true, sx: outlinedTextFieldSx },
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={labelSx}>
              Participant Instructions
            </Typography>
            <Tooltip title="Notes participants will read before the interview">
              <IconButton
                aria-label="Participant instructions help"
                size="small"
                sx={iconButtonSx}
              >
                <InfoOutlinedIcon sx={smallIconSx} />
              </IconButton>
            </Tooltip>
          </Box>

          <Box>
            <TextField
              fullWidth
              multiline
              rows={10.5}
              value={participantInstructions}
              onChange={(e) => setParticipantInstructions(e.target.value)}
              placeholder="Add instructions or notes for your interview participants to read before beginning the interview"
              variant="outlined"
              sx={outlinedTextFieldSx}
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
