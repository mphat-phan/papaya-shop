import * as React from 'react';
import { styled } from '@mui/material/styles';
import CartPreview from '../components/CartPreview';
import ResponsiveAppBar from '../components/Header';

export default function ThemeUsage() {
  return (
    <>
      <CartPreview />
      <ResponsiveAppBar></ResponsiveAppBar>
    </>
  );
}