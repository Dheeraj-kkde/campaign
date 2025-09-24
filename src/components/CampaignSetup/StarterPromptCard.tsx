import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

type Props = { prompt: string; onUse: (prompt: string) => void };

const StarterPromptCard: React.FC<Props> = ({ prompt, onUse }) => (
  <Card
    sx={{
      cursor: "pointer",
      transition: "all 0.2s",
      "&:hover": { boxShadow: 3, backgroundColor: "grey.50" },
    }}
    onClick={() => onUse(prompt)}
  >
    <CardContent sx={{ p: 2 }}>
      <Typography
        variant="caption"
        sx={{
          fontSize: "0.75rem",
          color: "text.secondary",
          display: "block",
          mb: 1.5,
          lineHeight: 1.4,
        }}
      >
        {prompt}
      </Typography>
      <Button
        size="small"
        variant="outlined"
        sx={{ fontSize: "0.7rem", textTransform: "none", py: 0.5, px: 1 }}
        onClick={(e) => {
          e.stopPropagation();
          onUse(prompt);
        }}
      >
        Use Starter Prompt
      </Button>
    </CardContent>
  </Card>
);

export default StarterPromptCard;
