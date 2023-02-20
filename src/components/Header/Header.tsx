import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
	Avatar,
	Menu,
	MenuItem,
	Tooltip,
	Button,
	Typography,
	Toolbar,
	ListItemButton,
	ListItemText,
	ListItem,
	List,
	IconButton,
	Drawer,
	Divider,
	CssBaseline,
	Box,
	AppBar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { MainHeaderLayout } from './Header.styles';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Home, Movies, Search, TvSeries } from '../../pages';

interface Props {
	window?: () => Window;
}

const drawerWidth = 240;
const settings = ['Profile', 'Account', 'Dashboard'];
const navItems = ['home', 'movies', 'tv-series'];

export function Header(props: Props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null,
	);

	const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);
	const navigate = useNavigate();

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<Typography variant='h6' sx={{ my: 2 }}>
				<Link style={{ color: '#333', textDecoration: 'none' }} to={'/'}>
					TMDB Films
				</Link>
			</Typography>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item} disablePadding>
						<ListItemButton sx={{ textAlign: 'center' }}>
							<ListItemText
								sx={{ textTransform: 'capitalize' }}
								onClick={() => navigate(item)}
								primary={item}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<MainHeaderLayout>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar sx={{ bgcolor: 'GrayText' }} component='nav'>
					<Toolbar>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							edge='start'
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: 'none' } }}>
							<MenuIcon />
						</IconButton>

						<Typography
							variant='h6'
							component='div'
							sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
							<Link className='main__link' to={'/'}>
								TMDB Films
							</Link>
						</Typography>

						<Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 3 }}>
							{navItems.map((item) => (
								<Button key={item} sx={{ color: '#fff' }}>
									{item}
								</Button>
							))}
						</Box>

						<Box sx={{ flexGrow: 0, ml: 'auto', p: 1 }}>
							<Tooltip title='Open settings'>
								<IconButton
									onClick={(event: React.MouseEvent<HTMLElement>) => {
										setAnchorElUser(event.currentTarget);
									}}
									sx={{ p: 0 }}>
									<Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id='menu-appbar'
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={() => {
									setAnchorElUser(null);
								}}>
								{settings.map((setting) => (
									<MenuItem
										key={setting}
										onClick={() => {
											setAnchorElUser(null);
										}}>
										<Typography textAlign='center'>{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</AppBar>
				<Box component='nav'>
					<Drawer
						container={container}
						variant='temporary'
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true,
						}}
						sx={{
							bgcolor: { xs: 'GrayText' },
							display: { xs: 'block', sm: 'none' },
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box',
								width: drawerWidth,
							},
						}}>
						{drawer}
					</Drawer>
				</Box>
				<Box component='main' sx={{ p: 3 }}>
					<Toolbar />
					<Routes>
						<Route path='/' element={<Search />} />
						<Route path='/home' element={<Home />} />
						<Route path='/movies' element={<Movies />} />
						<Route path='/tv-series' element={<TvSeries />} />
					</Routes>
				</Box>
			</Box>
		</MainHeaderLayout>
	);
}
