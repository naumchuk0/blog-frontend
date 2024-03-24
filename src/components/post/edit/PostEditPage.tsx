import {useNavigate, useParams} from "react-router-dom";
import {Button, Form, Input, Row, Switch} from "antd";
import {IPostEdit, IPostItem } from "../types.ts";
import http_common from "../../../http_common.ts";
import TextArea from "antd/es/input/TextArea";
import {useEffect} from "react";

const PostEditPage = () => {
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
    const [form] = Form.useForm<IPostEdit>();

    const onSubmit = async (values: IPostEdit) => {
        try {
            await http_common.put("/api/posts/edit/" + values.id, values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/posts');
        } catch (ex) {
            console.log("Exception create post", ex);
        }
    }

    useEffect(() => {
        http_common.get<IPostItem>(`/api/posts/${id}`)
            .then(resp => {
                const {data} = resp;
                form.setFieldsValue(data);
            })
            .catch(error => {
                console.log("Error server ", error);
            });
    }, [id]);

    const onChange = (checked : boolean) => {
        console.log(`switch to ${checked}`);
    };

    return (
        <>
            <h1>Edit Post</h1>
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

export default PostEditPage;

function useAppSelector(arg0: (state: any) => any): { isLogin: any; user: any; } {
    throw new Error("Function not implemented.");
}
