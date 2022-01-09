import {
  makeStyles, createStyles
} from '@material-ui/core/styles';

const fontSizeEm = 1.5;

export const useStyles = makeStyles(() => createStyles({
  input: {
    fontSize: `${fontSizeEm}em`,
    lineHeight: '0.5',
  },
  helper: {
    fontSize: `${fontSizeEm * 0.8}em`,
  },
  root: {
    marginTop: 10,
    marginBottom: 10,
  }
}));