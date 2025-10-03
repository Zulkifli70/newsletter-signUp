import { useEffect } from "react";
import JustValidate from "just-validate";
import "./App.css";

function App() {
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
      .onFail((fields) => {
        console.log("Validation failed!", fields);

        const emailInput = document.querySelector("#email");
        console.log("Input classes:", emailInput.className);
      });

    return () => {
      validation.destroy();
    };
  }, []);

  return (
    <>
      <div className="bg-white h-dvh flex flex-col gap-2">
        <div>
          <img
            src="../assets/images/illustration-sign-up-mobile.svg"
            alt="Image"
          />
        </div>
        <div className="p-6 flex flex-col gap-2">
          <h1 className="mb-6 text-4xl font-extrabold font-heading ">
            Stay Updated!
          </h1>
          <p className="mb-4 text-lg">
            Join 60.000+ product managers receiving monthly updates on:
          </p>
          <ul className="list-image-[url(../assets/images/icon-list.svg)] list-inside flex flex-col gap-3 text-base mb-10">
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
                  className="p-4 rounded-sm border-1"
                  placeholder="Enter your email"
                  name="email"
                  id="email"
                />
              </div>
              <div className="flex justify-center">
                <button
                  id="submit-btn"
                  className="primary-button text-white p-4 rounded-md font-medium"
                >
                  Subscribe to monthly newsletter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
