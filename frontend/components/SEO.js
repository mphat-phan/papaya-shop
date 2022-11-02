import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import settings from "../settings/settings-development";

const SEO = (props) => {
    const { title, description, image, url, shopName } = props;
    return (
        <Head>
            <title>{title} | Papaya Shop</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name= "keywords" content="từ khóa"/>
            <meta name="author" content="Papaya Shop" />

            <meta name="robots" content="noodp,index,follow" />
            {/* <meta http-equiv="content-language" content="vi" />
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
            {/* Open Graph */}
            <meta property="og:url" content={url} key="ogurl" />
            <meta property="og:image" content={image} key="ogimage" />
            <meta property="og:site_name" content={image} key="ogsitename" />
            <meta property="og:title" content={title} key="ogtitle" />
            <meta property="og:description" content={description} key="ogdesc" />
        </Head>
    );
};

SEO.defaultProps = {
    shopName: settings.meta.shopName,
    url: settings.meta.rootUrl,
    title: settings && settings.meta && settings.meta.title,
    description: settings && settings.meta && settings.meta.description,
    image:
        settings &&
        settings.meta &&
        settings.meta.social &&
        settings.meta.social.graphic,
};

SEO.propTypes = {
    shopName: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
};

export default SEO;