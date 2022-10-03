import * as React from 'react';
import { styled } from '@mui/material/styles';
import CartPreview from '../src/components/CartPreview';
import ResponsiveAppBar from '../src/components/Header';

export default function ThemeUsage() {
  return (
    <>
      <CartPreview />
      <ResponsiveAppBar></ResponsiveAppBar>
    </>
  );
}