import {Avatar, Button, Layout, Menu} from 'antd';
import {Link, useLocation} from 'react-router-dom';
import {UserOutlined, PoweroffOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import ButtonGroup from "antd/es/button/button-group";
import {APP_ENV} from "../../../env";
import {logout} from "../../../store/accounts/accounts.slice.ts";

const {Header} = Layout;

const DefaultHeader = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const {isLogin, user} = useAppSelector(state => state.account);

    const handleLogout = () => {
        //console.log("Logout user");
        dispatch(logout());
    };

    return (
        <Header style={{display: 'flex', alignItems: 'center'}}>
            <div className="demo-logo"/>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[location.pathname.substr(1)]} // Highlight the selected menu item
                style={{flex: 1, minWidth: 0}}
            >
                    <Menu.Item key={"/"}>
                        <Link to={`/`}>Home</Link>
                    </Menu.Item>
                    <Menu.Item key={"posts"}>
                        <Link to={`/posts`}>Posts</Link>
                    </Menu.Item>
                    <Menu.Item key={"tags"}>
                        <Link to={`/tags`}>Tags</Link>
                    </Menu.Item>
            </Menu>

            {isLogin ? (
                <ButtonGroup size="large">
                    <Button
                        type="primary"
                        style={{display: 'flex'}}
                        icon={<Avatar  size="small" src={`${APP_ENV.BASE_URL}images/${user?.name}`}/>}
                    >
                        {user?.name}
                    </Button>
                    <Button
                        type="primary"
                        icon={<PoweroffOutlined/>}
                        onClick={() => handleLogout()}
                    />
                </ButtonGroup>

            ) : (
                <Link to="/login" style={{color: 'inherit', textDecoration: 'none'}}>
                    <Button type="primary" icon={<UserOutlined/>}>
                        Увійти
                    </Button>
                </Link>
            )}

        </Header>
    );
};

export default DefaultHeader;

