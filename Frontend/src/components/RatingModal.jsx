import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingModal = ({ isOpen, onClose, onSubmit, booking, loading }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setRating(0);
            setHover(0);
            setComment('');
        }
    }, [isOpen]);

    const handleSubmit = () => {
        onSubmit({ rating, comment });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md m-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Leave a Review</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Share your experience with <span className="font-semibold">{booking?.providerName}</span> for the service <span className="font-semibold">"{booking?.serviceType}"</span>.
                </p>

                {/* Star Rating */}
                <div className="flex justify-center items-center my-6">
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                    className="hidden"
                                />
                                <FaStar
                                    className="cursor-pointer"
                                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                    size={40}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                />
                            </label>
                        );
                    })}
                </div>

                {/* Comment Box */}
                <div className="mb-6">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Comment (Optional)
                    </label>
                    <textarea
                        id="comment"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary"
                        placeholder="Tell us more about your experience..."
                    ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || rating === 0}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-primary/50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RatingModal;

