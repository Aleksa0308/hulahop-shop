import React, { useEffect, useState } from "react";
import inspiration from "../../../assets/images/inspiration.jpg";
import blog2 from "../../../assets/images/blog2.jpg";
import blog3 from "../../../assets/images/blog3.png";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { get, map, replace, size } from "lodash";
import {
  ROUTE_ASSOCIATE_BRAND_STORE_BLOGS,
  ROUTE_ASSOCIATE_BRAND_STORE_BLOGS_ID,
  ROUTE_MAIN_BLOG,
  ROUTE_MAIN_BLOG_SINGLE,
} from "../../../routes/routes";
import { getImageUrlById } from "../../../utils/commonFunctions";
import parse from "html-react-parser";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const BlogPage = () => {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const params = useParams();
  const [loading, setLoading] = useState();
  const [blogData, setBlogData] = useState();
  const [blogList, setBlogList] = useState([]);

  const getBlogData = async () => {
    setLoading(true);

    let id = get(params, "blogId") || get(params, "id");
    const response = await commonGetQuery(`/blogs/${id}`);
    if (response) {
      const { data } = response.data;

      setBlogData(data);
      setLoading(false);
    }
    setLoading(false);
  };

  const getBlogList = async () => {
    setLoading(true);
    const response = await commonGetQuery("/blogs");
    if (response) {
      const { data } = response.data;
      setBlogList(data);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    let id = get(params, "id");
    if (id) {
      getBlogData();
    } else {
      navigation(ROUTE_MAIN_BLOG);
    }
    getBlogList();
  }, []);
  return (
    <div className="page-wrapper single-blog-page">
      <Helmet>
        <title>
          {get(blogData, "heading")
            ? t(get(blogData, "heading"))
            : t("Blogs Details - HulaHop")}
        </title>
      </Helmet>
      <div className="blog-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-wrapper">
                <div className="blog-main">
                  <div className="blog-head-section">
                    <p className="blog-tag">
                      {t(get(blogData, "category_name", ""))}
                    </p>
                    <h5 className="blog-title">
                      {t(get(blogData, "heading", ""))}
                    </h5>
                    <div className="blog-head-footer">
                      <p className="blog-auther-text">by: Velimir Stupar</p>
                      <p className="blog-post-date">
                        {moment(Number(get(blogData, "created_at", ""))).format(
                          "MMMM, DD,YYYY"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="blog-poster-img">
                    <img
                      src={
                        get(blogData, "image_id", "") &&
                        getImageUrlById(get(blogData, "image_id", ""))
                      }
                      alt=""
                    />
                  </div>
                  <dib className="blog-content-box">
                    <div className="blog-content-wrapper">
                      {get(blogData, "content", "") &&
                        parse(get(blogData, "content"))}
                    </div>
                  </dib>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="blog-sidebar-section">
                <div className="hero-section">
                  <h3 className="banner-head">{t("Related Blogs")}</h3>
                </div>
                <div className="releted-blogs">
                  {size(blogList) > 0 &&
                    map(blogList, (item, key) => {
                      return (
                        <>
                          {(get(params, "blogId") || get(params, "id")) !=
                          get(item, "id") ? (
                            <div
                              className="releted-blog-box"
                              key={key}
                              role="button"
                              onClick={() => {
                                get(params, "id", null)
                                  ? window.location.replace(
                                      ROUTE_ASSOCIATE_BRAND_STORE_BLOGS_ID.replace(
                                        ":id",
                                        get(params, "id", null)
                                      ).replace(":blogId", item.id)
                                    )
                                  : window.location.replace(
                                      ROUTE_MAIN_BLOG_SINGLE.replace(
                                        ":id",
                                        item.id
                                      )
                                    );
                              }}
                            >
                              <div className="releted-blog-flexbox">
                                <div
                                  className="releted-blog-img"
                                  style={{
                                    backgroundImage: `url(${getImageUrlById(
                                      get(item, "image_id")
                                    )})`,
                                  }}
                                ></div>
                                <div className="releted-blog-desc">
                                  <h4>{t(get(item, "heading"))}</h4>
                                  <p className="blog-auther-name">
                                    Velimir Stupar
                                  </p>
                                  <p className="blog-post-date">
                                    {moment(
                                      Number(get(item, "created_at", ""))
                                    ).format("MMMM, DD,YYYY")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
