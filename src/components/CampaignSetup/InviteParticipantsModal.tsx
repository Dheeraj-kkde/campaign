import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import { useCampaignStore } from "../../store/campaignStore";

type Props = { open: boolean; onClose: () => void };

const suggestions = [
  "Christin M Melton",
  "Meera Mohammad",
  "John Doe Allgar",
  "Olivia Johnson",
  "Alexander Brown",
  "Michael Garcia H",
];

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

const InviteParticipantsModal: React.FC<Props> = ({ open, onClose }) => {
  const participants = useCampaignStore((s) => s.participants);
  const addParticipant = useCampaignStore((s) => s.addParticipant);
  const removeParticipant = useCampaignStore((s) => s.removeParticipant);

  const [inviteInput, setInviteInput] = useState("");
  const [addingPulse, setAddingPulse] = useState(false);
  const [chipWiggle, setChipWiggle] = useState<Record<number, boolean>>({});
  const [addButtonPop, setAddButtonPop] = useState(false);

  const handleAdd = () => {
    const val = inviteInput.trim();
    if (!val) return;
    addParticipant(val);
    setInviteInput("");
    setAddingPulse(true);
    setAddButtonPop(true);
    setTimeout(() => setAddButtonPop(false), 180);
    setTimeout(() => setAddingPulse(false), 600);
  };

  const handleRemove = (idx: number) => {
    setChipWiggle((prev) => ({ ...prev, [idx]: true }));
    setTimeout(() => {
      removeParticipant(idx);
      setChipWiggle((prev) => {
        const copy = { ...prev };
        delete copy[idx];
        return copy;
      });
    }, 260);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Grow}
      transitionDuration={220}
      disableRestoreFocus
    >
      <Fade in={open} timeout={220}>
        <Box>
          <DialogTitle>Invite Participants</DialogTitle>
          <DialogContent
            dividers
            sx={{ pt: 3, pb: 3, mx: 3, borderBottom: "none", padding: "8px" }}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter email or name and press Enter"
                value={inviteInput}
                onChange={(e) => setInviteInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  ...outlinedTextFieldSx,
                  "& .MuiInputBase-root": {
                    transition: "box-shadow 180ms ease",
                    boxShadow: addingPulse
                      ? "0 8px 30px rgba(25,118,210,0.07)"
                      : "none",
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleAdd}
                sx={{
                  ...containedButtonSx,
                  py: 1,
                  px: 2,
                  transform: addButtonPop ? "scale(1.06)" : "scale(1)",
                  transition: "transform 140ms ease-in-out",
                }}
              >
                Add
              </Button>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {suggestions.map((s) => (
                  <Button
                    key={s}
                    size="small"
                    variant="outlined"
                    onClick={() => addParticipant(s)}
                    sx={{
                      textTransform: "none",
                      borderColor: "#1e49e2",
                      color: "#1e49e2",
                    }}
                  >
                    + {s}
                  </Button>
                ))}
              </Stack>
            </Box>

            <Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {participants.map((p, idx) => (
                  <Box
                    key={p}
                    sx={{
                      display: "inline-flex",
                      animation: chipWiggle[idx]
                        ? "wiggle 260ms ease-in-out"
                        : undefined,
                    }}
                  >
                    <Chip
                      label={p}
                      onDelete={() => handleRemove(idx)}
                      deleteIcon={<CloseIcon />}
                      variant="outlined"
                      sx={{
                        padding: "5px 6px",
                        border: "1px solid #EDF0FD",
                        backgroundColor: "#EDF0FD",
                        transition: "all 0.2s ease",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ pr: 3, pb: 2 }}>
            <Button variant="outlined" onClick={onClose} sx={outlinedButtonSx}>
              Close
            </Button>
          </DialogActions>
        </Box>
      </Fade>
    </Dialog>
  );
};

export default InviteParticipantsModal;
