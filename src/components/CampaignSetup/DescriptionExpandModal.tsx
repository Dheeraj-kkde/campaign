import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Fade,
  Grow,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useCampaignStore } from "../../store/campaignStore";

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

const AUTOSAVE_DELAY_MS = 2000;

type Props = { open: boolean; onClose: () => void };

const DescriptionExpandModal: React.FC<Props> = ({ open, onClose }) => {
  const description = useCampaignStore((s) => s.description);
  const setDescription = useCampaignStore((s) => s.setDescription);

  const [draft, setDraft] = useState(description);
  const [autosaveOpen, setAutosaveOpen] = useState(false);
  const lastSavedRef = useRef(description);
  const draftRef = useRef(draft);

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);

  useEffect(() => {
    if (open) {
      setDraft(description);
      draftRef.current = description;
    }
  }, [description, open]);

  const commit = useCallback(
    (nextDraft: string, showToast = true) => {
      if (nextDraft !== lastSavedRef.current) {
        setDescription(nextDraft);
        lastSavedRef.current = nextDraft;
        if (showToast) {
          setAutosaveOpen(true);
          setTimeout(() => setAutosaveOpen(false), 1400);
        }
      }
    },
    [setDescription]
  );

  useEffect(() => {
    if (!open) return;
    const handle = window.setTimeout(
      () => commit(draftRef.current, true),
      AUTOSAVE_DELAY_MS
    );
    return () => window.clearTimeout(handle);
  }, [draft, open, commit]);

  useEffect(() => {
    return () => {
      commit(draftRef.current, false);
    };
  }, [commit]);

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

  return (
    <Dialog
      open={open}
      onClose={() => {
        commit(draftRef.current, false);
        onClose();
      }}
      maxWidth="md"
      fullWidth
      TransitionComponent={Grow}
      transitionDuration={220}
    >
      <Fade in={open} timeout={220}>
        <div>
          <DialogTitle>Description</DialogTitle>
          <DialogContent
            sx={{
              margin: "0px 24px",
              padding: "16px 0px",
            }}
          >
            <TextField
              fullWidth
              multiline
              minRows={10}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a detailed description..."
              sx={outlinedTextFieldSx}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: "block" }}
            >
              Changes autosave after 2s of inactivity.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ pr: 3, pb: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                onClose();
              }}
              sx={outlinedButtonSx}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                commit(draftRef.current, false);
                onClose();
              }}
              sx={containedButtonSx}
            >
              Save
            </Button>
          </DialogActions>

          <Snackbar
            open={autosaveOpen}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert severity="success">Autosaved</Alert>
          </Snackbar>
        </div>
      </Fade>
    </Dialog>
  );
};

export default DescriptionExpandModal;
