import { style } from '@vanilla-extract/css';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
});

const container = style({
  display: 'flex',
  padding: '1rem 20px',
  flexDirection: 'column',
  gap: '32px',
});

const btmContent = style({
  padding: 0,
});

const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

const box = style({
  borderRadius: '24px',
  padding: '0 0 1rem',
  backgroundColor: '#F2F3F5',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center',
  textAlign: 'center',
  marginTop: '1rem',
});

export const appSt = {
  bottomBtn,
  container,
  btmContent,
  row,
  box,
};
