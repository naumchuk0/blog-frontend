import {useNavigate} from "react-router-dom";
import {ICategoryCreate} from "../types.ts";
import {Button, Form, Input, Row} from "antd";
import TextArea from "antd/es/input/TextArea";
import http_common from "../../../http_common.ts";
import { useAppSelector } from "../../../hooks/redux/index.ts";
import { useEffect } from "react";

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

    const [form] = Form.useForm<ICategoryCreate>();

    const onSubmit = async (values: ICategoryCreate) => {
        try {
            await http_common.post("/api/categories/create", values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        }
        catch(ex) {
            console.log("Exception create category", ex);
        }
    }

    return (
        <>
            <h1>Add Category</h1>
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
                        label="Name"
                        name="name"
                        htmlFor="name"
                        rules={[
                            {required: true, message: 'Це поле є обов\'язковим!'},
                            {min: 3, message: 'Назва повинна містити мінімум 3 символи!'},
                        ]}
                    >
                        <Input autoComplete="name"/>
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
                    <Row style={{display: 'flex', justifyContent: 'center'}}>
                        <Button style={{margin: 10}} type="primary" htmlType="submit">
                            Add
                        </Button>
                        <Button style={{margin: 10}} htmlType="button" onClick={() =>{ navigate('/')}}>
                            Cancle
                        </Button>
                    </Row>
                </Form>
            </Row>


        </>
    )
}

export default CategoryCreatePage;