import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  mainHeader: {
    width: 'auto',
    fontSize: '28px',
    fontWeight: '900',
    color: tokens.colorBrandForeground1,
    textAlign: 'right',
    padding: '5px 0',
    borderBottom: `10px ridge  ${tokens.colorBrandStroke1}`,
    marginTop: '5px',
    marginBottom: '5px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
});
