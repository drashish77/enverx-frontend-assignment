import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import './style.css'
import { Divider } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteExpense } from '../../redux/actions/expenses'
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

interface CardTypes {
  id?: string
  amount?: number
  title?: string
  description?: string
  time?: any
  category?: string
}
export default function ExpansesCard(item: CardTypes) {
  const { id, title, description, time, category, amount } = item
  const [expanded, setExpanded] = React.useState(false)

  // const handleExpandClick = (id: string) => {
  //   console.log({ id })
  //   setExpanded(!expanded)
  // }

  const dispath = useDispatch()
  const handleDelete = () => {
    console.log(item)
    dispath(deleteExpense(item))
  }
  return (
    <Card className='card'>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
            {title && title.toLowerCase()[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label='settings' onClick={handleDelete}>
            <DeleteForeverIcon />
          </IconButton>
        }
        title={title}
        subheader={[
          <div>{time.toDate().toDateString()}</div>,
          time.toDate().toLocaleTimeString('en-US')
        ]}
      />

      <CardContent>
        <Typography variant='body2' color='text.secondary' sx={{ padding: 0 }}>
          <span className='card-span'>Amount:</span>
          {amount}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography color='text.secondary' sx={{ padding: 0 }}>
          <span className='card-span'>Category:</span>
          {category}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography paragraph>
          Description:
          <Divider sx={{ marginTop: 1 }} />
        </Typography>
        <Typography paragraph className='card-item'>
          {description}
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          // onClick={() => handleExpandClick(id)}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions> */}
      {/* <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Full Description:
            <Divider sx={{ marginTop: 1 }} />
          </Typography>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  )
}
