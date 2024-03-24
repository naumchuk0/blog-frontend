import {useNavigate, useParams} from "react-router-dom";
import {Button, Form, Input, Row} from "antd";
import {ICategoryEdit, ICategoryItem } from "../types.ts";
import http_common from "../../../http_common.ts";
import TextArea from "antd/es/input/TextArea";
import {useEffect} from "react";
import { useAppSelector } from "../../../hooks/redux/index.ts";

const CategoryEditPage = () => {
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
    const {id} = useParams();
    const [form] = Form.useForm<ICategoryEdit>();

    const onSubmit = async (values: ICategoryEdit) => {
        try {
            await http_common.put("/api/categories/edit/" + values.id, values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        } catch (ex) {
            console.log("Exception create category", ex);
        }
    }

    useEffect(() => {
        http_common.get<ICategoryItem>(`/api/categories/${id}`)
            .then(resp => {
                const {data} = resp;
                form.setFieldsValue(data);
            })
            .catch(error => {
                console.log("Error server ", error);
            });
    }, [id]);


    return (
        <>
            <h1>Редагування категорію</h1>
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
                            Edit
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

export default CategoryEditPage;