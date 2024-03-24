import {ICategoryItem} from "../types.ts";
import {Button, Card, Col, Popconfirm, Typography} from "antd";
import Meta from "antd/es/card/Meta";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux/index.ts";

const { Title } = Typography;

interface ICategoryCardProps {
    item: ICategoryItem,
    handleDelete: (id: number) => void
}

const CategoryCard: React.FC<ICategoryCardProps> = (props) => {
    const {item, handleDelete} = props;
    const {id, name, description} = item;

    const {isLogin, user} = useAppSelector(state => state.account);

    let isAdmin = false;

    user?.roles.forEach(role=> {
        if (role.toLowerCase().includes('admin'))
            isAdmin=true;
    });


    return (
        <>
            <Col style={{padding: 10}} xxl={4} lg={6} md={8} sm={12}>
                <Card
                    bodyStyle={{flex: '1', paddingBlock: '10px'}}
                    style={{height: 380, display: 'flex', flexDirection: 'column', paddingTop: '40px'}}
                    hoverable
                    actions={[
                        isLogin && isAdmin ? (
                            <>
                                <Link to={`/category/edit/${id}`}>
                                    <Button type="primary" icon={<EditOutlined/>}>
                                        Edit
                                    </Button>
                                </Link>
                                <Popconfirm
                                title="Are you sure to delete this category?"
                                onConfirm={() => handleDelete(id)}
                                okText="Yes"
                                cancelText="No"
                                >
                                    <Button icon={<DeleteOutlined/>}>
                                        Delete
                                    </Button>
                                </Popconfirm>
                            </>
                        ) : (
                            <></>
                        )
                    ]}
                >

                    <Meta
                        title={name}
                        description={
                            <Title level={5} type="success">{description.substring(0, 35)} ...</Title>
                        }
                    />
                </Card>
            </Col>
        </>
    )
}

export default CategoryCard;