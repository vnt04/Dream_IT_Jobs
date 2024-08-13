/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";

function Review({ listReviews, starAverage, percentStar }) {
  const percentRate = (numberStar) => {
    return (
      (listReviews.filter((review) => review.star === numberStar).length /
        listReviews.length) *
      100
    );
  };
  return (
    <div>
      <div className="content-company">
        <div className="content-company-header">Đánh giá chung</div>
        <div className="sm:flex sm:justify-center sm:gap-10 sm:py-2">
          <div className="flex flex-col items-start py-2 sm:items-center">
            <span className="text-xl font-bold">{starAverage}</span>
            <div className="flex space-x-1 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="relative">
                  <div className="left-0 top-0 h-full w-full text-gray-300">
                    <FaStar size={24} />
                  </div>
                  <div
                    className="absolute left-0 top-0 h-full overflow-hidden"
                    style={{ width: `${percentStar(star, starAverage)}%` }}
                  >
                    <FaStar fill="#ffc107" size={24} />
                  </div>
                </div>
              ))}
            </div>
            <span>{listReviews.length} đánh giá</span>
          </div>

          <div>
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center space-x-1">
                <span>{star}</span>
                <FaStar size={13} fill="#ffc107" />
                <div className="relative w-48">
                  <div className="left-0 top-0 h-3 rounded border bg-teal-50"></div>
                  <div
                    className="absolute left-0 top-0 h-3 overflow-hidden rounded bg-primary"
                    style={{ width: `${percentRate(star)}%` }}
                  ></div>
                </div>
                <span>{percentRate(star)} %</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="content-company">
        <div className="content-company-header">
          {listReviews.length} đánh giá
        </div>
        <div>
          {listReviews.map((review, index) => (
            <div key={index} className="py-4">
              <div className="text-sm font-semibold text-gray-400">
                Tháng 4, 2024
              </div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="relative">
                    <div className="left-0 top-0 h-full w-full text-gray-300">
                      <FaStar size={14} />
                    </div>
                    <div
                      className="absolute left-0 top-0 h-full overflow-hidden"
                      style={{ width: `${percentStar(star, review.star)}%` }}
                    >
                      <FaStar fill="#ffc107" size={14} />
                    </div>
                  </div>
                ))}
                <span>({review.star})</span>
              </div>
              <div>
                <b>Các điểm tôi thích:</b>
                <div>{review.goodReview}</div>
              </div>
              <div>
                <b>Các điểm tôi không thích:</b>
                <div>{review.badReview}</div>
              </div>
              <hr className="my-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Review;
