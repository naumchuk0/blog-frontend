import {useNavigate} from "react-router-dom";
import {IPostCreate} from "../types.ts";
import {Button, Form, Input, Row, Switch} from "antd";
import TextArea from "antd/es/input/TextArea";
import http_common from "../../../http_common.ts";
import { useEffect } from "react";
import { useAppSelector } from "../../../hooks/redux/index.ts";

const CategoryCreatePage = () => {
    const {isLogin, user} = useAppSelector(state => state.account);

    const navigate = useNavigate();

    let isAdmin = false;

    user?.roles.forEach(role=> {
        if (role.toLowerCase().includes('admin'))
            isAdmin=true;
    });

    useEffect(() => {
        if (!isLogin )
            navigate("/login");
        else if(!isAdmin)
            navigate("/");
    }, []);

    const [form] = Form.useForm<IPostCreate>();

    const onSubmit = async (values: IPostCreate) => {
        try {
            await http_common.post("/api/posts/create", values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/posts');
        }
        catch(ex) {
            console.log("Exception create category", ex);
        }
    }

    const onChange = (checked : boolean) => {
        console.log(`switch to ${checked}`);
    };

    return (
        <>
            <h1>Add Post</h1>
            <Row gutter={16}>
            <Form form={form}
                      onFinish={onSubmit}
                      layout={"vertical"}
                      style={{
                          minWidth: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          padding: 20,
                      }}
                >
                    <Form.Item
                        name="id"
                        hidden
                    />
                    <Form.Item
                        label="Title"
                        name="title"
                        htmlFor="title"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                            {min: 3, message: 'Назва повинна містити мінімум 3 символи!'},
                        ]}
                    >
                        <Input autoComplete="title"/>
                    </Form.Item>
                    <Form.Item
                        label="Category Id"
                        name="categoryId"
                        htmlFor="categoryId"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                        ]}
                    >
                        <Input autoComplete="categoryId"/>
                    </Form.Item>
                    <Form.Item
                        label="Meta"
                        name="meta"
                        htmlFor="meta"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                        ]}
                    >
                        <Input autoComplete="meta"/>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        htmlFor="description"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                            {min: 10, message: 'Опис повинен містити мінімум 10 символів!'},
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>
                    <Form.Item
                        label="Short description"
                        name="shortDescription"
                        htmlFor="shortDescription"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                            {min: 10, message: 'Short description повинен містити мінімум 10 символів!'},
                        ]}
                    >
                        <TextArea/>
                    </Form.Item>
                    <Form.Item
                        label="Published"
                        name="published"
                        htmlFor="published"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                        ]}
                    >
                        <Switch defaultChecked onChange={onChange} />
                    </Form.Item>
                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Add
                        </Button>
                        <Button style={{margin: 10}} htmlType="button" onClick={() => {
                            navigate('/')
                        }}>
                            Cancle
                        </Button>
                    </Row>
                </Form>
            </Row>


        </>
    )
}

export default CategoryCreatePage;