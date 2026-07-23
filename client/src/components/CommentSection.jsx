import { useEffect, useState } from "react";
import api from "../services/api";

function CommentSection({ blogId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${blogId}`);
      setComments(res.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (blogId) {
      fetchComments();
    }
  }, [blogId]);

  const addComment = async () => {
    if (!text.trim()) return;

    try {
      await api.post(`/comments/${blogId}`, {
        text,
      });

      setText("");

      fetchComments();
    } catch (error) {
      alert("Please login to comment.");
    }
  };

  return (
    <div className="mt-12">

      <h2 className="text-3xl font-bold mb-6">
        Comments
      </h2>

      {/* Add Comment */}

      <div className="flex gap-4 mb-10">

        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addComment}
          className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700"
        >
          Post
        </button>

      </div>

      {/* Comment List */}

      {comments.length === 0 ? (

        <p className="text-gray-500">
          No comments yet.
        </p>

      ) : (

        <div className="space-y-5">

          {comments.map((comment) => (

            <div
              key={comment._id}
              className="bg-gray-50 rounded-xl p-5 border"
            >

              <div className="flex items-center mb-2">

                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                  {comment.author?.name?.charAt(0).toUpperCase()}

                </div>

                <div className="ml-3">

                  <h3 className="font-semibold">

                    {comment.author?.name}

                  </h3>

                  <p className="text-sm text-gray-500">

                    {new Date(comment.createdAt).toLocaleString()}

                  </p>

                </div>

              </div>

              <p className="text-gray-700">

                {comment.text}

              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default CommentSection;