import {Button, Col, Form, Input, Pagination, Radio, Row} from "antd";
import {Link, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ITagItem, ITagSearch, IGetTags} from "../types.ts";
import http_common from "../../../http_common.ts";
import CategoryCard from "./TagCard.tsx";
import { useAppSelector } from "../../../hooks/redux/index.ts";

const TagCreatePage = () => {

    const [form] = Form.useForm<ITagSearch>();
    const [body, setBody] = useState<IGetTags>({
        content: [],
        totalElements: 0
    });

    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState<ITagSearch>({
        name: searchParams.get("name") || "",
        page: Number(searchParams.get("page")) || 1,
        size: Number(searchParams.get("size")) || 5
    });

    const sort = {
        sortByName: (a: { name: String; }, b: { name: String; }) => {
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        },
        sortByDescription: (a: { description: String; }, b: { description: String; }) => {
        if(a.description < b.description) { return -1; }
        if(a.description > b.description) { return 1; }
        return 0;
        }
    }

    useEffect(() => {
        http_common.get<IGetTags>("/api/tags/search",
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

    const {content, totalElements} = body;

    const handleDelete = async (id: number) => {
        try {
            await http_common.delete(`/api/tags/delete/` + id);
            setBody({...body, content: content.filter(x=>x.id!=id)});
        }
        catch(error) {
            console.log("Error delete", error);
        }
    }

    const handlePageChange = async (page: number, newPageSize: number) => {
        findCategories({...search, page, size: newPageSize});
    };

    const findCategories = (model: ITagSearch) => {
        setSearch(model);
        updateSearchParams(model);
    }

    const updateSearchParams = (params : ITagSearch) =>{
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
    const handleSortByName = () => {
        setBody({...body, content: content.sort(sort.sortByName)});
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
                    onFinish={findCategories}
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
                    name={"name"}
                    htmlFor={"name"}
                    >
                        <Input autoComplete={"search"}/>
                    </Form.Item>
                </Form>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h1>Tags List</h1>
                <h2>Sort by:</h2>
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                {
                    isLogin && isAdmin ? (
                        <Link to={"/tag/create"}>
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
                    <Radio.Button onClick={handleSortByName} value="name">Name</Radio.Button>
                    <Radio.Button onClick={handleSortByDescription} value="description">Description</Radio.Button>
                </Radio.Group>
            </div>
            <Row gutter={16}>
                <Col span={24}>
                    <Row>
                        {content.length === 0 ? (
                            <h2>The List Is Empty</h2>
                        ) : (
                            content.map((item: ITagItem) =>
                                <CategoryCard key={item.id} item={item} handleDelete={handleDelete} />,
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

export default TagCreatePage;