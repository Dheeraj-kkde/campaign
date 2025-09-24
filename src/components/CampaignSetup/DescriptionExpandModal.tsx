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
import { debounce } from "../../utils/debounce";

const AUTOSAVE_DELAY_MS = 2000;

type Props = { open: boolean; onClose: () => void };

const DescriptionExpandModal: React.FC<Props> = ({ open, onClose }) => {
  const description = useCampaignStore((s) => s.description);
  const setDescription = useCampaignStore((s) => s.setDescription);

  const [draft, setDraft] = useState(description);
  const [autosaveOpen, setAutosaveOpen] = useState(false);
  const lastSavedRef = useRef(description);

  useEffect(() => setDraft(description), [description]);

  const commit = useCallback(
    (showToast = true) => {
      if (draft !== lastSavedRef.current) {
        setDescription(draft);
        lastSavedRef.current = draft;
        if (showToast) {
          setAutosaveOpen(true);
          setTimeout(() => setAutosaveOpen(false), 1400);
        }
      }
    },
    [draft, setDescription]
  );

  const debounced = useRef(debounce(() => commit(true), AUTOSAVE_DELAY_MS));

  useEffect(() => {
    if (!open) return;
    debounced.current();
  }, [draft, open]);

  useEffect(() => {
    return () => {
      commit(false);
    };
  }, [commit]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        commit(false);
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
          <DialogContent dividers>
            <TextField
              fullWidth
              multiline
              minRows={10}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a detailed description..."
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
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                commit(false);
                onClose();
              }}
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
