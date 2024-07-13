import { FaStar } from "react-icons/fa";

function Review() {
  return (
    <div>
      <div className="content-company">
        <div className="content-company-header">Đánh giá chung</div>
        <div className="flex gap-8 items-center">
          <div >
            <span>5.0</span>
            <div className="text-orange-400 flex gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <span>1324 đánh giá</span>
          </div>

          <div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
