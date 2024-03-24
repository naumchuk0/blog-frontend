import {Button, Col, Form, Input, Pagination, Radio, Row} from "antd";
import {Link, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IPostItem, IPostSearch, IGetPosts} from "../types.ts";
import http_common from "../../../http_common.ts";
import PostCard from "./PostCard.tsx";
import { useAppSelector } from "../../../hooks/redux/index.ts";

const PostListPage = () => {

    const [form] = Form.useForm<IPostSearch>();
    const [body, setBody] = useState<IGetPosts>({
        content: [],
        totalElements: 0
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState<IPostSearch>({
        title: searchParams.get("title") || "",
        page: Number(searchParams.get("page")) || 1,
        size: Number(searchParams.get("size")) || 5
    });

    useEffect(() => {
        http_common.get<IGetPosts>("/api/posts/search",
            {
                params: {
                    ...search,
                    page: search.page-1
                }
            })
            .then(resp => {
               const {data} = resp;
                console.log("Server data", data);
                setBody(data);
            });
    },[search]);

    const sort = {
        sortByTitle: (a: { title: String; }, b: { title: String; }) => {
            if(a.title < b.title) { return -1; }
            if(a.title > b.title) { return 1; }
            return 0;
        },
        sortByDescription: (a: { description: String; }, b: { description: String; }) => {
        if(a.description < b.description) { return -1; }
        if(a.description > b.description) { return 1; }
        return 0;
        }
    }

    const {content, totalElements} = body;

    const handleDelete = async (id: number) => {
        try {
            await http_common.delete(`/api/posts/delete/` + id);
            setBody({...body, content: content.filter(x=>x.id!=id)});
        }
        catch(error) {
            console.log("Error delete", error);
        }
    }

    const handlePageChange = async (page: number, newPageSize: number) => {
        findPosts({...search, page, size: newPageSize});
    };

    const findPosts = (model: IPostSearch) => {
        setSearch(model);
        updateSearchParams(model);
    }

    const updateSearchParams = (params : IPostSearch) =>{
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== 0 && value!="") {
                searchParams.set(key, value);
            } else {
                searchParams.delete(key);
            }
        }
        setSearchParams(searchParams);
    };

    const handleSortById = () => {
        setBody({...body, content: content.sort((a, b) => a.id > b.id ? 1 : -1)});
    }
    const handleSortByTitle = () => {
        setBody({...body, content: content.sort(sort.sortByTitle)});
    }
    const handleSortByDescription = () => {
        setBody({...body, content: content.sort(sort.sortByDescription)});
    }

    const {isLogin, user} = useAppSelector(state => state.account);

    let isAdmin = false;

    user?.roles.forEach(role=> {
        if (role.toLowerCase().includes('admin'))
            isAdmin=true;
    });

    return (
        <>
            <Form form={form}
                    onFinish={findPosts}
                    layout={"vertical"}
                    style={{
                        "minWidth": '100%',
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: 20
                    }}
                >
                    <Form.Item
                    label={"Search"}
                    name={"title"}
                    htmlFor={"title"}
                    >
                        <Input autoComplete={"search"}/>
                    </Form.Item>
                </Form>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h1>Posts List</h1>
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                {
                    isLogin && isAdmin ? (
                        <Link to={"/post/create"}>
                            <Button type="primary" size={"large"}>
                                Add
                            </Button>
                        </Link>
                    ) : (
                        <></>
                    )
                }
                <Radio.Group>
                    <Radio.Button onClick={handleSortById} value="id">Id</Radio.Button>
                    <Radio.Button onClick={handleSortByTitle} value="title">Title</Radio.Button>
                    <Radio.Button onClick={handleSortByDescription} value="description">Description</Radio.Button>
                </Radio.Group>
            </div>
            <Row gutter={16}>
                <Col span={24}>
                    <Row>
                        {content.length === 0 ? (
                            <h2>The List Is Empty</h2>
                        ) : (
                            content.map((item: IPostItem) =>
                                <PostCard key={item.id} item={item} handleDelete={handleDelete} />,
                            )
                        )}
                    </Row>
                </Col>
            </Row>

            <Row style={{width: '100%', display: 'flex', marginTop: '25px', justifyContent: 'center'}}>
                <Pagination
                    showTotal={(total, range) => {
                        // console.log("range ", range);
                        return (`${range[0]}-${range[1]} from ${total} categories`);
                    }}
                    current={search.page}
                    defaultPageSize={search.size}
                    total={totalElements}
                    onChange={handlePageChange}
                    pageSizeOptions={[1, 3, 5, 10]}
                    showSizeChanger
                />
            </Row>
        </>
    )
}

export default PostListPage;