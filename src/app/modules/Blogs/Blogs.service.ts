import httpStatus from "http-status";
import QueryBuilder from "../../../builder/QueryBuilder";
import AppError from "../../error/AppError";
import { BlogSearchFields } from "./Blogs.constant";
import { TBlog } from "./Blogs.interface";
import { BlogModel } from "./Blogs.model";

const createBlogIntoDB = async (payload: TBlog) => {
  const createBlog = await BlogModel.create(payload);
  return createBlog;
};

const updateBlogIntoDB = async (blogId: string, payload: Partial<TBlog>) => {
  const blog = await BlogModel.findById(blogId);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog Not Found!");
  }

  const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, payload, {
    new: true,
  });
  return updatedBlog;
};

const getSingleBlogByIdFromDb = async (blogId: string) => {
  const blog = await BlogModel.findById(blogId);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog Not Found!");
  }

  const singleBlog = await BlogModel.findById(blogId);
  return singleBlog;
};

const getBlogsQueryFromDb = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(BlogModel.find(), query)
    .search(BlogSearchFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await blogsQuery.modelQuery;
  const meta = await blogsQuery.countTotal();
  return {
    meta,
    result,
  };
};

const deleteBlogFromDB = async (blogId: string) => {
  const blog = await BlogModel.findById(blogId);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog Not Found!");
  }
  const deleted = await BlogModel.findByIdAndDelete(blogId);
  return deleted;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  getBlogsQueryFromDb,
  getSingleBlogByIdFromDb,
  deleteBlogFromDB,
};
