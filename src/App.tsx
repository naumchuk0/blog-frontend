import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout.tsx";
import CategoryListPage from "./components/category/list/CategoryListPage.tsx";
import CategoryCreatePage from "./components/category/create/CategoryCreatePage.tsx";
import CategoryEditPage from "./components/category/edit/CategoryEditPage.tsx";
import TestPage from "./components/test";
import Login from "./views/Login";
import Register from "./views/Register";
import AdminLayout from "./components/containers/admin/AdminLayout.tsx";
import PostEditPage from "./components/post/edit/PostEditPage.tsx";
import PostCreatePage from "./components/post/create/PostCreatePage.tsx";
import PostListPage from "./components/post/list/PostListPage.tsx";
import TagCreatePage from "./components/tag/create/TagCreatePage.tsx";
import TagEditPage from "./components/tag/edit/TagEditPage.tsx";
import TagListPage from "./components/tag/list/TagListPage.tsx";

const App : React.FC = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout/>}>
                    <Route index element={<CategoryListPage/>}/>
                    <Route path={"category"}>
                        <Route path={"create"} element={<CategoryCreatePage/>}/>
                        <Route path={"edit/:id"} element={<CategoryEditPage/>}/>
                    </Route>

                    <Route path={"/posts"} element={<PostListPage/>}></Route>
                    <Route path={"post/create"} element={<PostCreatePage/>}/>
                    <Route path={"post/edit/:id"} element={<PostEditPage/>}/>

                    <Route path={"/tags"} element={<TagListPage/>}></Route>
                    <Route path={"tag/create"} element={<TagCreatePage/>}/>
                    <Route path={"tag/edit/:id"} element={<TagEditPage/>}/>

                    <Route path={"login"} element={<Login/>}/>
                    <Route path={"register"} element={<Register/>}/>

                    <Route path={"test"} element={<TestPage/>}/>
                </Route>

                <Route path={"/admin"} element={<AdminLayout/>}>
                    <Route path={"category"}>
                        <Route index element={<CategoryListPage/>}/>
                        <Route path={"create"} element={<CategoryCreatePage/>}/>
                        <Route path={"edit/:id"} element={<CategoryEditPage/>}/>
                    </Route>
                    <Route path={"posts"} element={<PostListPage/>}></Route>
                    <Route path={"post/create"} element={<PostCreatePage/>}/>
                    <Route path={"post/edit/:id"} element={<PostEditPage/>}/>
                    <Route path={"tags"} element={<TagListPage/>}></Route>
                    <Route path={"tag/create"} element={<TagCreatePage/>}/>
                    <Route path={"tag/edit/:id"} element={<TagEditPage/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;