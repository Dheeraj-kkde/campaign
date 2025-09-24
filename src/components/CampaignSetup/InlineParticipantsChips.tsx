import React, { useEffect, useState } from "react";
import { Chip, Stack, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCampaignStore } from "../../store/campaignStore";

const InlineParticipantsChips: React.FC<{ onOpenInvite: () => void }> = ({
  onOpenInvite,
}) => {
  const participants = useCampaignStore((s) => s.participants);
  const removeParticipant = useCampaignStore((s) => s.removeParticipant);

  const [inlineAddingPulse, setInlineAddingPulse] = useState(false);
  const [inlineChipWiggle, setInlineChipWiggle] = useState<
    Record<number, boolean>
  >({});

  useEffect(() => {
    setInlineAddingPulse(true);
    const t = setTimeout(() => setInlineAddingPulse(false), 600);
    return () => clearTimeout(t);
  }, [participants.length]);

  const removeInlineChip = (index: number) => {
    setInlineChipWiggle((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      removeParticipant(index);
      setInlineChipWiggle((prev) => {
        const copy = { ...prev };
        delete copy[index];
        return copy;
      });
    }, 260);
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      flexWrap="wrap"
      useFlexGap
      sx={{
        mb: 1,
        animation: inlineAddingPulse ? "pulse 600ms ease-out" : undefined,
      }}
    >
      {participants.slice(0, 4).map((p, i) => {
        const idx = participants.indexOf(p);
        return (
          <Box
            key={p}
            sx={{
              display: "inline-flex",
              animation: inlineChipWiggle[idx]
                ? "wiggle 260ms ease-in-out"
                : undefined,
            }}
          >
            <Chip
              label={p}
              onDelete={() => removeInlineChip(idx)}
              variant="outlined"
              deleteIcon={<CloseIcon />}
              sx={{
                mb: 1,
                transition: "all 0.2s ease",
                "&:hover": { boxShadow: 2, transform: "translateY(-2px)" },
              }}
            />
          </Box>
        );
      })}
      {participants.length > 4 && (
        <Chip
          label={`+ ${participants.length - 4} others`}
          onClick={onOpenInvite}
          variant="outlined"
          sx={{
            mb: 1,
            cursor: "pointer",
            transition: "transform 180ms ease",
            "&:active": { transform: "scale(0.95)" },
            "&:hover": {
              boxShadow: 2,
              transform: "translateY(-2px) scale(1.02)",
            },
          }}
        />
      )}
    </Stack>
  );
};

export default InlineParticipantsChips;
