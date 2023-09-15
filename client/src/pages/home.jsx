// React and Basic import
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {theme, darkTheme} from '../css/theme.jsx'

// React MUI import
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';

//Icon import
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SaveIcon from '@mui/icons-material/Save';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

//api
import api,{file_url} from '../api.js'

//other func
import fileDownload from 'js-file-download'


const NavBar = ({updateImages}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return(
    <AppBar position="sticky" theme={darkTheme} >
        <Box sx={{mr:3,ml:3}}>
            <Toolbar disableGutters sx={{display:'flex'}}>
                <IconButton 
                    id="button"
                    aria-controls={open ? 'menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{mr:1, ml:-1}}>
                    <MenuIcon sx={{color:'white'}}/>
                </IconButton>
                <Menu
                    id="menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'menu-button',
                    }}
                >
                    <MenuItem onClick={()=>{handleClose();}}>
                        <SaveIcon sx={{mr:2}} />
                        保存meta
                    </MenuItem>
                    <MenuItem onClick={()=>{updateImages();handleClose()}}>
                        <SaveAltIcon sx={{mr:2}} />
                        更新圖片
                    </MenuItem>
                    <MenuItem onClick={()=>{handleClose()}}>
                        <ContentPasteSearchIcon sx={{mr:2}} />
                        改變圖片資料夾
                    </MenuItem>
                </Menu>
            </Toolbar>
        </Box>
    </AppBar>
    )
}

//Main
export function Home() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openInfo, setOpenInfo] = useState(true);

    const [fileList, setFileList] = useState([]);

    const [maxPage, setMaxPage] = useState(1);
    const [page, setPage] = useState(1);

    const updateImages = () => {
        api({url:'/updateFileList'})
        .then((res) => {
            if (res.data === 'updated') alert('更新完毕')
            else alert('更新失敗')
        })
    }

    useEffect(() => {
        api({url:'/getFileList', params:{path:'/Objects/11faces'}})
        .then((res) => {
           console.log(res)
        })
    },[]);


    return(
    <Box>
        <NavBar
                updateImages={updateImages}/>

        <Grid sx={{mt:2,mb:2}} container>
            <Grid item  sm={2}>
                111
                <Box sx={{pt:2,pb:2, display: 'flex',justifyContent:'center'}}>
                    <Pagination  count={maxPage} page={page} variant="outlined" color="primary" />
                </Box>
            
            </Grid>
            <Grid item  sm={6} sx={{display:'flex',justifyContent:'center',alignItem:'center'}}>
                222
            </Grid>
            <Grid item sm={4} sx={{textAlign: 'left'}}>
               333
            </Grid>
        </Grid>
        

    </Box>
    )
}