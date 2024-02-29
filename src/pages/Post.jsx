import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import serv from "../appwrite/conf";
import {Button} from "../compo"
import parse from "html-react-parser"
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.userdata);
    
    const isAuthor = post && userData ? post.userid == userData.userdata.$id : false;

    useEffect(() => {
        if (slug) {
            serv.getpost(slug).then((post) => {
                console.log("getpost setpost",post);
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        serv.deletepost(post.$id).then((status) => {
            if (status) {
                serv.deletefile(post.photoimg);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 w-[90vw] mx-auto">
                <div className="w-full flex justify-center mb-4 relative rounded-sm p-2">
                    <img
                        src={serv.getfilepreview(post.photoimg)}
                        alt={post.title}
                        className="rounded-xl w-[80%]"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgcolor="bg-green-500" className="mr-3" child={"edit"}>
                                </Button>
                            </Link>
                            <Button bgcolor="bg-red-500" onClick={deletePost} child={"Delete"}>
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                <p className=' w-[70vw] text-right font-semibold text-white text-[0.6rem]'>{post.writer}</p>
                    <h1 className="text-2xl font-bold text-center capitalize">{post.title}</h1>
                </div>
                <div className="browser-css w-[80vw] mx-auto text-[0.9rem]">
                    {parse(post.content)}
                    </div>
        </div>
    ) : null;
}