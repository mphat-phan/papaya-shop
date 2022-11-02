import React from "react";
import PropTypes from "prop-types";
import SEO from "../../components/SEO";
import StyledPost from "./index.css";
import Image from "next/image";
const Post = (props) => (
  <StyledPost>
    <SEO
        url={`${props.url}/post`}
        openGraphType="website"
        schemaType="article"
        title="The Fate of Empires"
        description="The only thing we learn from history, it has been said, 'is that men never learn from history'..."
        image={`${props.url}/colosseum.jpeg`}
    />
    <div>
      <Image 
        src="/colosseum.jpeg"
        alt="Colosseum"
        width={50}
        height={50}
      />
      <p>
        As we pass through life, we learn by experience. We look back on our
        behaviour when we were young and think how foolish we were. In the same
        way our family, our community and our town endeavour to avoid the
        mistakes made by our predecessors.
      </p>
      <p>
        The experiences of the human race have been recorded, in more or less
        detail, for some four thousand years. If we attempt to study such a
        period of time in as many countries as possible, we seem to discover the
        same patterns constantly repeated under widely differing conditions of
        climate, culture and religion. Surely, we ask ourselves, if we studied
        calmly and impartially the history of human institutions and development
        over these four thousand years, should we not reach conclusions which
        would assist to solve our problems today? For everything that is
        occurring around us has happened again and again before.
      </p>
      <p>
        No such conception ever appears to have entered into the minds of our
        historians. In general, historical teaching in schools is limited to
        this small island. We endlessly mull over the Tudors and the Stewarts,
        the Battle of Crecy, and Guy Fawkes. Perhaps this narrowness is due to
        our examination system, which necessitates the careful definition of a
        syllabus which all children must observe.
      </p>
      <p>
        The only thing we learn from history,’ it has been said, ‘is that men
        never learn from history’, a sweeping generalisation perhaps, but one
        which the chaos in the world today goes far to confirm. What then can be
        the reason why, in a society which claims to probe every problem, the
        bases of history are still so completely unknown?{" "}
      </p>
    </div>
  </StyledPost>
);

Post.propTypes = {
  url: PropTypes.string.isRequired,
};

export const getServerSideProps = (context) => {
  console.log(`-----------` + context?.req?.headers?.host + `-----------` )
  return {
    props: {
      url: context?.req?.headers?.host,
    },
  };
};

export default Post;