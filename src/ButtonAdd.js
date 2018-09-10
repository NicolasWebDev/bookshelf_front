import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import CircularProgress from '@material-ui/core/CircularProgress'
import blue from '@material-ui/core/colors/blue'

const styles = theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
    display: 'inline-block'
  },
  fabProgress: {
    color: blue[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonSuccess: {
    backgroundColor: grey[500],
    '&:hover': {
      backgroundColor: grey[700]
    }
  }
})

const ButtonAdd = ({ classes, loading, handleClick }) => (
  <div className={classes.wrapper}>
    <Button
      variant="fab"
      color="primary"
      className={classes.buttonSuccess}
      onClick={handleClick}
      type="submit"
    >
      <AddIcon />
    </Button>
    {loading && <CircularProgress size={68} className={classes.fabProgress} />}
  </div>
)

export default withStyles(styles)(ButtonAdd)
