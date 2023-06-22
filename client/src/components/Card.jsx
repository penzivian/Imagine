import React, { useEffect, useState } from "react";

import { download, logo } from "../assets";
import { downloadImage } from "../utils";
import { ThumbsUp } from "lucide-react";
import { MessageCircle } from "lucide-react";
import axios from "axios";
import { ArrowRightSquare } from "lucide-react";

const Card = ({ _id, name, prompt, photo }) => {
  const [likes, setLikes] = useState();
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getLikes = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/likes/${_id}`
        );
        setLikes(data.message.length);
      } catch (error) {
        console.log(error);
      }
    };

    const getComments = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/comments/${_id}`
        );
        setComments(data.message);
      } catch (error) {
        console.log(error);
      }
    };
    getLikes();
    getComments();
  }, []);

  const addLike = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/likes/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success === false) {
        alert(`${data.message}`);
        return;
      }
      if (data.success === true) {
        setLikes(likes + 1);
        alert('Liked✅')
        return;
      } else {
        alert("LogIn first!");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (!input) {
        alert("Comment is empty");
      } else {
        const response = await fetch(
          `http://localhost:8080/api/v1/comments/${_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ comment: input }),
          }
        );
        const data = await response.json();
        if (data.success === true) {
          setComments([...comments, data.message]);
          alert("Commented✅")
          return;
        } else {
          alert("LogIn First");
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent border-none"
          >
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert"
            />
          </button>
        </div>

        {/* For Like and Comment */}
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              onClick={addLike}
              className="w-7 h-7 rounded-full object-cover bg-black flex justify-center items-center text-white text-xs font-bold cursor-pointer"
            >
              <ThumbsUp />
            </div>
            <p className="text-white text-sm">{likes}</p>
          </div>
          <div
            type="button"
            // onClick={}
            className="outline-none bg-transparent border-none "
          >
            {/* Modal Component */}
            <button
              className="text-white rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 flex"
              type="button"
              onClick={() => setShowModal(true)}
            >
              <p className="">Comments</p>
              <MessageCircle />
            </button>
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className=" w-[90vw] sm:w-[70vw] lg:w-[50vw] border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between border-b border-solid border-slate-200 rounded-t">
                        <h3 className="p-2 text-xl font-semibold">Comments</h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative flex-auto">
                        {/* Comments Component */}

                        <div className="h-[70vh] overflow-y-scroll flex justify-start bg-white dark:bg-gray-800">
                          <div className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 p-4 antialiased flex max-w-lg">
                            <div>
                              {comments.map((comment, i) => {
                                return (
                                  <div key={i}>
                                    <div className="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5">
                                      <div className="font-semibold text-sm leading-relaxed">
                                        {comment.name}
                                      </div>
                                      <div className="text-normal leading-snug md:leading-normal">
                                        {comment.comment}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                        <div className=" w-[80%] flex items-center">
                          <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Comment"
                            className="border-2 border-gray-500 rounded-xl p-2 w-[80%] mr-2"
                          />
                          <ArrowRightSquare
                            onClick={addComment}
                            className="cursor-pointer"
                          />
                        </div>
                        <button
                          className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
