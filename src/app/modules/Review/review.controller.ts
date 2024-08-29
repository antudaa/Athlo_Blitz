import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { UserReviewServices } from "./review.service";
import sendResponse from "../../utils/sendResponse";
import noDataFound from "../../middlewares/noDataFound";

const createUserReview: RequestHandler = catchAsync(async (req, res) => {
    const review = req.body;
    const result = await UserReviewServices.createUserReview(review);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review posted successfully",
        data: result,
    });
});

const getAllReviews: RequestHandler = catchAsync(async (req, res) => {
    const result = await UserReviewServices.getAllReviews(req.query);

    if (result.data.length === 0) {
        return noDataFound(res);
    }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review data retrieved successfully",
        data: result,
    });
});

const getReviewById: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserReviewServices.getReviewById(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review data retrieved successfully",
        data: result,
    });
});

const updateReview: RequestHandler = catchAsync(async (req, res) => {
    const  payload  = req.body;
    const { id } = req.params;
    console.log(payload, id);
    const result = await UserReviewServices.updateReview(id, payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review data updated successfully",
        data: result,
    });
});

const deleteReview: RequestHandler = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserReviewServices.deleteReview(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Review deleted successfully",
        data: result,
    });
});

export const UserReviewControllers = {
    createUserReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
};