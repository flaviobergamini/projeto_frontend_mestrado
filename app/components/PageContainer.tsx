'use client';

import { Container, Paper, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function PageContainer({
  title,
  children,
  maxWidth = 'md'
}: PageContainerProps) {
  return (
    <Container maxWidth={maxWidth}>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ mb: 3, fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Paper elevation={3} sx={{ p: 4 }}>
          {children}
        </Paper>
      </Box>
    </Container>
  );
}
