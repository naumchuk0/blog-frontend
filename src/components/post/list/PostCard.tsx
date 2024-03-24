import {IPostItem} from "../types.ts";
import {Button, Card, Col, Popconfirm, Typography} from "antd";
import Meta from "antd/es/card/Meta";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux/index.ts";

const { Title } = Typography;

interface IPostCardProps {
    item: IPostItem,
    handleDelete: (id: number) => void
}

const PostCard: React.FC<IPostCardProps> = (props) => {
    const {item, handleDelete} = props;
    const {id, title, shortDescription, meta, published, postedOn} = item;

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
                                <Link to={`/post/edit/${id}`}>
                                <Button type="primary" icon={<EditOutlined/>}>
                                    Edit
                                </Button>
                                </Link>,

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
                    )]}
                >

                    <Meta
                        title={title}
                    />
                    <Title level={5} type="success">{shortDescription.substring(0, 35)} ...</Title>
                    <Title level={5} type="success">{meta.substring(0, 35)} ...</Title>
                    <p>{meta}</p>
                    <p>{published}</p>
                    <p>{postedOn}</p>
                </Card>
            </Col>
        </>
    )
}

export default PostCard;