import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import ChannelReviewsSummary from './ChannelReviewsSummary';
import ChannelReviewCard from './ChannelReviewCard';

const ChannelReviews = (props) => {
  const { reviews, ...other } = props;

  const rating = reviews.reduce((acc, review) => acc + review.value, 0) / reviews.length;

  return (
    <div {...other}>
      <ChannelReviewsSummary
        rating={rating}
        reviewsCount={reviews.length}
      />
      {reviews.map((review) => (
        <Box
          key={review.id}
          sx={{ mt: 2 }}
        >
          <ChannelReviewCard
            authorAvatar={review.author.avatar}
            authorName={review.author.name}
            comment={review.comment}
            createdAt={review.createdAt}
            value={review.value}
          />
        </Box>
      ))}
    </div>
  );
};

ChannelReviews.propTypes = {
  reviews: PropTypes.array
};

export default ChannelReviews;
