import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  header: {
    width: '100%',
    backgroundColor: tokens.colorBrandBackground,
    padding: '12px 24px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: tokens.colorNeutralForegroundOnBrand,
    letterSpacing: '1px',
    textAlign: 'center',
  }
});
