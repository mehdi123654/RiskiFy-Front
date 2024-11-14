import { useEffect, useRef, useState } from "react";
import NewsLatterBox from "./NewsLatterBox.jsx";
import { FiSend } from "react-icons/fi";
import { Chat } from "../../../../../Services/ChatService.js";

const Contact = () => {
  const textareaRef = useRef(null);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]); // Array to store conversation history

  const handleInput = (e) => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  const handleSubmit = async (e) => {
    if (message.trim()) {
      try {
        const response = await Chat(message);
        
        // Add both the message and the answer to the conversation array
        setConversation((prev) => [
          ...prev,
          { message, answer: response?.answer || "No answer available" }
        ]);

        setMessage(""); // Clear the input field
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <div className="flex flex-col justify-center items-center">
                <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                  What can I help with?
                </h2>
                
              </div>

              {/* Display conversation history */}
              <div className="mb-8">
                {conversation.map((conv, index) => (
                  <div key={index} className="mb-4 ">
                    <div>
                    <p className="text-base font-semibold text-body-color mb-1">You:</p>
                    <p className="mb-2 text-base text-body-color">{conv.message}</p>
                    </div>
                    <div>
                    <p className="text-base font-semibold text-primary">Bot:</p>
                    <p className="text-base text-body-color">{conv.answer}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4">
                    <div className="mb-8 relative">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        ref={textareaRef}
                        name="message"
                        rows={1}
                        placeholder="Enter your Message"
                        className="w-full resize-none overflow-hidden rounded-md border border-transparent py-3 pr-14 pl-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        onInput={handleInput}
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                      ></textarea>
                      <div
                        className="absolute bottom-3 right-4 flex items-center justify-center w-10 h-10 bg-primary/[3%] dark:bg-white text-primary rounded-full cursor-pointer shadow-md"
                        onClick={handleSubmit}
                      >
                        <FiSend size={25} />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
