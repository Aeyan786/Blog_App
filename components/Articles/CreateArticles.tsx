"use client";
import React, { useActionState, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import "react-quill-new/dist/quill.snow.css";
import { CreateArticle } from "@/actions/create-article";
import Link from "next/link";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const CreateArticles = () => {
  const [value, setValue] = useState("");
  const [formState, actions, isPending] = useActionState(CreateArticle.bind(null,value), {
    errors: {},
  });
  

 

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Create New Article
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form  className="space-y-6" action={actions}>
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Enter your title" />
              {formState.errors.title && (
                <span className="text-sm text-red-600">
                  {formState.errors.title}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="health">Health</option>
                <option value="environment">Environment</option>
              </select>
              {formState.errors.category && (
                <span className="text-sm text-red-600">
                  {formState.errors.category}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredimage">Featured Image</Label>
              <Input
                type="file"
                id="featuredimage"
                name="featuredimage"
                accept="image/*"
                className="cursor-pointer file:mr-4 file:rounded-md file:border-0 file:bg-muted file:px-4  file:text-sm file:font-semibold file:text-primary hover:file:bg-muted/80"
              />
              {formState.errors.featuredImage && (
                <span className="text-sm text-red-600">
                  {formState.errors.featuredImage}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>

              <ReactQuill theme="snow" value={value} onChange={setValue} />
              {formState.errors.content && (
                <span className="text-sm text-red-600">
                  {formState.errors.content}
                </span>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Link href={'/dashboard'}><Button type="button" variant="outline">
                Cancel
              </Button>
              </Link>
              <Button disabled={isPending} type="submit">
                {isPending ? "Loading..." : "Publish"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateArticles;
