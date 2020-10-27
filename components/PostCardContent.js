import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';


const PostCardContent = ({postData}) => ( //해시태그 regexr.com
        <div>
            {postData.split(/(#[^\s#]+)/g).map((v, i) => {
                if (v.match(/(#[^\s#]+)/)) {
                    return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
                }
                return v;
            })}
        </div>

);

PostCardContent.PropTypes = {
    postData:PropTypes.string.isRequired
};

export default PostCardContent;