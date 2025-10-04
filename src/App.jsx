import { useEffect, useRef, useState } from "react";
import JustValidate from "just-validate";
import "./App.css";

function App() {
  const validationRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const validation = new JustValidate("#form");

    validation
      .addField("#email", [
        {
          rule: "required",
          errorMessage: "Email is required",
        },
        {
          rule: "email",
          errorMessage: "Email is invalid!",
        },
      ])
      .onSuccess((event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const emailValue = formData.get("email");
        setEmail(emailValue);

        setShowModal(true);
      })
      .onFail((fields) => {
        console.log("Validation failed!", fields);

        const emailInput = document.querySelector("#email");
        console.log("Input classes:", emailInput.className);
      });

    validationRef.current = validation;

    return () => {
      validation.destroy();
    };
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white h-dvh flex flex-col gap-2 lg:max-w-5xl lg:flex-row-reverse lg:h-fit lg:rounded-lg overflow-hidden">
          <div className="lg:p-4">
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet="../assets/images/illustration-sign-up-desktop.svg"
              />
              <img
                src="../assets/images/illustration-sign-up-mobile.svg"
                alt="Sign up illustration"
                className="w-full h-auto"
              />
            </picture>
          </div>
          <div className="p-6 flex flex-col gap-2 lg:p-10 lg:justify-center">
            <h1 className="mb-6 text-4xl font-extrabold font-heading lg:text-6xl ">
              Stay Updated!
            </h1>
            <p className="mb-4 text-lg">
              Join 60.000+ product managers receiving monthly updates on:
            </p>
            <ul className="list-image-[url(../assets/images/icon-list.svg)] list-inside flex flex-col gap-3 text-base mb-10 lg:mb-4">
              <li>Product discovery and building what matters</li>
              <li>Measuring to ensure updates are a success</li>
              <li>And much more!</li>
            </ul>
            <div>
              <form id="form">
                <div className="flex flex-col gap-2 mb-2">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="p-4 rounded-sm border-1 mb-2"
                    placeholder="Enter your email"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    id="submit-btn"
                    className="primary-button text-white p-4 rounded-md font-medium w-full hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 transition-all"
                  >
                    Subscribe to monthly newsletter
                  </button>
                </div>
              </form>
            </div>
          </div>
          {showModal && (
            <div className="fixed inset-0 bg-white/30 backdrop-blur-xs flex items-center justify-center z-40">
              <div className="bg-white p-8 max-w-md w-full shadow-2xl h-dvh lg:h-fit lg:rounded-2xl">
                <div className="flex flex-col justify-between gap-4 h-full b">
                  <div className="flex flex-col justify-center gap-4 flex-2">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h2 className="text-4xl font-extrabold">
                      Thanks for subscribing!
                    </h2>
                    <p className="text-gray-600">
                      A confirmation email has been sent to{" "}
                      <span className="font-bold">{email}</span>. Please open it
                      and click the button inside to confirm your subscription.
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={closeModal}
                      className="w-full bg-slate-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 text-white p-4 rounded-lg font-medium mt-4 transition-all"
                    >
                      Dismiss message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
