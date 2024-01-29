import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import {Select, RTE, Input, Button} from "../index"
import serv from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PostForm({ post }) {
    // console.log("edit" post.title)
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userdata = useSelector((state) => state.userdata);
    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await serv.uploadfile(data.image[0]) : null;

            if (file) {
                serv.deletefile(post.photoimg);
            }

            const dbPost = await serv.updatepost(post.$id, {
                ...data,
                photoimg: file ? file.$id : undefined,
            });

            if (dbPost) {
                // window.location.reload()
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await serv.uploadfile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.photoimg = fileId;
                const dbPost = await serv.createpost({ ...data, userid:userdata.userdata.$id, writer:userdata.userdata.name  });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
const winwidth = window.innerWidth

if (winwidth >= 600) return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="border-gray-400 border-2 my-2 placeholder-stone-400 placeholder:capitalize placeholder:text-[0.8rem]"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="url"
                    className="border-gray-400 border-2 my-2 placeholder-stone-400 placeholder:capitalize placeholder:text-[0.8rem]"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={serv.getfilepreview(post.photoimg)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    opctions={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgcolor={post ? "bg-green-500" : undefined} className="w-full" child={post ? "Update" : "Submit"}>
                    
                </Button>
            </div>
        </form>
    )
    if (winwidth <= 600) return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-full px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="border-gray-400 border-2 my-2 placeholder-stone-400 placeholder:capitalize placeholder:text-[0.8rem]"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="url"
                readOnly
                className="border-gray-400 border-2 my-2 placeholder-stone-400 placeholder:capitalize placeholder:text-[0.8rem]"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        <div className="w-full px-2 flex flex-col items-center justify-center mt-7">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={serv.getfilepreview(post.photoimg)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                opctions={["active", "inactive"]}
                label="Status"
                className="mb-4  w-[15rem]"
                {...register("status", { required: true })}
                />
            <Button type="submit" bgcolor={post ? "bg-green-500" : undefined} className="w-full mb-6" child={post ? "Update" : "Submit"}>
                
            </Button>
        </div>
                </div>
    </form>
    )
}