import { Outlet } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, TextField, InputAdornment } from '@mui/material'
import { KeyboardArrowDown, Search } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { useTranslation } from 'react-i18next';

const broadcastLineHeight = "24px";

const carouselItems = [
  {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!"
  },
  {
      name: "Random Name #2",
      description: "Hello World!"
  }
]

const SearchField = styled('div')(({ theme }) => ({
  textAlign: "end",
  [theme.breakpoints.down('md')]: {
    paddingTop: "8px",
    paddingRight: "2vw",
    paddingLeft: "2vw",
    flex: "1",
  },
  [theme.breakpoints.between('md', 'lg')]: {
    paddingTop: "0px",
    paddingRight: "2vw",
    paddingLeft: "3vw",
    flex: "0.9"
  },
  [theme.breakpoints.up('lg')]: {
    paddingTop: "0px",
    paddingRight: "1vw",
    paddingLeft: "1vw",
    flex: "0.5"
  }
}));

const Broadcast = styled('div')(() => ({
  height: broadcastLineHeight,
  lineHeight: broadcastLineHeight,
  width: "100%",
  backgroundColor: "#999999",
  color: "#fff",
  textAlign: "center",
  borderBottom: "1px solid black",
  fontSize: "0.9rem"
}));

const Buttons = styled('div')(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  [theme.breakpoints.between('xs', 'sm')]: {
    paddingLeft: "8px",
    paddingRight: "8px",
    justifyContent: "flex-start",
    overflowX: "scroll",
    flexWrap: "nowrap",
    whiteSpace: "nowrap",
    letterSpacing: "-0.5px",
    gap: "6px",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "::-webkit-scrollbar": { 
      display: "none"
    }
  },
  [theme.breakpoints.between('sm', 'md')]: {
    paddingLeft: "8px",
    paddingRight: "8px",
    justifyContent: "center",
    gap: "6px",
  },
  [theme.breakpoints.between('md', 'lg')]: {
    paddingLeft: "1vw",
    justifyContent: "center",
    gap: "8px"
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: "50px",
    gap: "16px"
  }
}));

const Categories = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  flex: "1",
  padding: "8px 0px",
  justifyContent: "space-between",
  flexWrap: "wrap",
  [theme.breakpoints.down('md')]: {
    flexFlow: "column"
  },
  [theme.breakpoints.up('md')]: {
    flexFlow: "row"
  }
}));

function LandingPage() {
  const { t } = useTranslation();
  const btnStyle = {
    margin: "0px",
    padding: "5px",
    letterSpacing: "inherit",
    minWidth: "unset"
  }
  return (
    <div>
      <Categories>
        <Buttons>
          <Button endIcon={<KeyboardArrowDown />} color="contrast" variant="outlined" sx={btnStyle}>{t("newfeatured")}</Button>
          <Button endIcon={<KeyboardArrowDown />} color="contrast" variant="outlined" sx={btnStyle}>{t("sale")}</Button>
          <Button endIcon={<KeyboardArrowDown />} color="contrast" variant="outlined" sx={btnStyle}>{t("men")}</Button>
          <Button endIcon={<KeyboardArrowDown />} color="contrast" variant="outlined" sx={btnStyle}>{t("women")}</Button>
          <Button endIcon={<KeyboardArrowDown />} color="contrast" variant="outlined" sx={btnStyle}>{t("kids")}</Button>
          <Button endIcon={<KeyboardArrowDown />} color="contrast" variant="outlined" sx={btnStyle}>{t("collection")}</Button>
        </Buttons>
        <SearchField>
          <TextField fullWidth variant="outlined" placeholder={t("findproduct") + "..."}
            sx={{ backgroundColor: "#ffffff", flex: "1", borderRadius: "20px" }} 
            inputProps={{sx: {padding: "8px 14px !important"} }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              sx: { borderRadius: "20px" }}} />
        </SearchField>
      </Categories>
      <Broadcast>
        Broadcast
      </Broadcast>
      <div className='carousel' style={{ width: "100%" }}>
        <Carousel>
          { carouselItems.map((item, i) => <CarouselItem key={i} item={item} />) }
        </Carousel>
      </div>
      <Outlet />
    </div>
  );
}

function CarouselItem(props) {
  return (
    <Paper>
        <h2>{props.item.name}</h2>
        <p>{props.item.description}</p>

        <Button className="CheckButton">
            Check it out!
        </Button>
    </Paper>
)
}

export default LandingPage;
