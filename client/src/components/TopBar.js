import React, {useContext} from 'react'
import {Context} from '../index'
import {SHOP_ROUTE, BASKET_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE} from '../utils/consts'
import { observer } from 'mobx-react-lite'
import { Container } from 'react-bootstrap'
import {useNavigate} from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand style={{color:'white'}} onClick={()=>navigate(SHOP_ROUTE)}>MogilniyShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        
        {user.isAdmin ? 
                <Nav className="me-right">
                    <Nav.Link onClick={()=>{
                        navigate(ADMIN_ROUTE)
                        }}>Админ панель
                    </Nav.Link> 
                    
                </Nav>
            :
            <Nav></Nav>
        }
        {user.isAuth ?
                <Nav className="me-auto">
                    <Nav.Link onClick={()=>{
                        user.setUser({})
                        user.setIsAuth(false)
                        user.userOrAdmin(false)
                        navigate(LOGOUT_ROUTE) 
                    }}>Выйти
                    </Nav.Link>

                </Nav>
                :
                <Nav className="me-auto" style={{color: 'black'}}>
                    <Nav.Link onClick={()=>{
                        navigate(LOGIN_ROUTE)
                        }}>Авторизация
                    </Nav.Link>
                </Nav>
        }
        {user.isAuth ?
                <Nav className="me-left">    
                    <Nav.Link onClick={()=>{
                        navigate(BASKET_ROUTE)
                        }}>Корзина
                    </Nav.Link>
                </Nav>
                :
                <Nav></Nav>
        }
        </Navbar.Collapse>
      </Container>
    </Navbar>

    
    );
});
export default NavBar;