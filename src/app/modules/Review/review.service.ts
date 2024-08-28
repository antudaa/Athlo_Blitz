import QueryBuilder from "../../builder/QueryBuilder";
import { reviewSearchableFields } from "./review.constant";
import { TUserReview } from "./review.interface";
import { UserReview } from "./review.model";

const createUserReview = async (payload: TUserReview) => {
    const result = await UserReview.create(payload);
    return result;
};

const getAllReviews = async (query: Record<string, unknown>) => {

    const reviewQuery = new QueryBuilder(UserReview.find(), query)
        .search(reviewSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const [reviews, totalCount] = await Promise.all([
        reviewQuery.modelQuery.populate('user').populate('facility'),
        reviewQuery.getTotalCount()
    ])

    const result = { total: totalCount, data: reviews };
    return result;
}

const getReviewById = async (id: string) => {
    const result = await UserReview.findById(id)
        .populate('user')
        .populate('facility');

    return result;
};

const updateReview = async (id: string, payload: Partial<TUserReview>) => {
    const result = UserReview.findByIdAndUpdate(
        id,
        payload,
        {
            new: true,
            runValidators: true,
        }
    );
    return result;
};

const deleteReview = async (id: string) => {
    const result = await UserReview.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
            runValidators: true,
        }
    );
    return result;
};

export const UserReviewServices = {
    createUserReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
};