import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

type Props = {
  prompt: string;
  onUse: (prompt: string) => void;
};

const StarterPromptCard: React.FC<Props> = ({ prompt, onUse }) => {
  return (
    <Card
      onClick={() => onUse(prompt)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onUse(prompt);
        }
      }}
      sx={{
        cursor: "pointer",
        borderRadius: 2, // ~8px
        border: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "#fbfbfc"
            : theme.palette.background.paper,
        transition:
          "transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: (theme) => theme.shadows[4],
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "#ffffff"
              : theme.palette.background.paper,
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            minHeight: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: "center",
              fontWeight: 500,
              color: "text.primary",
              lineHeight: 1.3,
              // clamp so text doesn't overflow too large
              fontSize: ["0.95rem", "1rem"],
            }}
          >
            {prompt}
          </Typography>
        </Box>
      </CardContent>

      <Box sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={(e) => {
            // prevent card click firing twice
            e.stopPropagation();
            onUse(prompt);
          }}
          aria-label="Use starter prompt"
          variant="outlined"
          size="small"
          sx={{
            width: "100%",
            borderRadius: 5.5,
            borderWidth: 1,
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.95rem",
            py: 1,
            color: (theme) => theme.palette.primary.main,
            borderColor: (theme) => theme.palette.primary.main,
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: (theme) => theme.shadows[1],
              borderColor: (theme) => theme.palette.primary.dark,
              backgroundColor: "transparent",
            },
          }}
        >
          Use Starter Prompt
        </Button>
      </Box>
    </Card>
  );
};

export default StarterPromptCard;
