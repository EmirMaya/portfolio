"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Contact = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      website: formData.get("website"),
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        setErrorMessage(
          resData?.error || "Something went wrong. Please try again."
        );
        return;
      }

      setEmailSubmitted(true);
    } catch {
      setErrorMessage("Unable to send this message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative "
    >
      {/* <div className='className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-400 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"'></div> */}

      <div className="z-10">
        <h5 className="text-xl md:text-3xl bg-sky-500 pl-1 font-bold text-white my-2">
          Let&apos;s Connect
        </h5>
        <p className="text-[#e9e8dd] mb-4 max-w-md roboto-condensed-font">
          {" "}
          I&apos;m actively seeking new opportunities. Feel free to reach out
          anytime - I&apos;m here to chat or answer any questions you may have!
        </p>
        <div className="socials flex flex-row items-center gap-2 ">
          <Link href={"https://github.com/EmirMaya"} target="_blank">
            <Image
              src={"/images/github.svg"}
              alt="github"
              width={32}
              height={32}
            />
          </Link>
          <Link href={"https://www.linkedin.com/in/emirmaya/"} target="_blank">
            <Image
              src={"/images/linkedin.svg"}
              alt="linkedin"
              width={64}
              height={64}
            />
          </Link>
        </div>
      </div>
      <div>
        {emailSubmitted ? (
          <p className="text-emerald-500 text-sm mt-2">
            Email sent successfully!
          </p>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              type="text"
              name="website"
              tabIndex="-1"
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className="mb-6 roboto-condensed-font">
              <label
                htmlFor="email"
                className="text-white block mb-2 text-sm font-medium"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                autoComplete="email"
                required
                maxLength={254}
                className="bg-[#3b3b3b]  rounded-xl border border-neutral-400 placeholder-[#6e88a1] text-gray-100 text-sm block w-full p-2.5"
              />
              <label
                htmlFor="subject"
                className="text-white block my-2 text-sm font-medium"
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Subject"
                required
                maxLength={120}
                className="bg-[#3b3b3b]  rounded-xl border border-neutral-400 placeholder-[#6e88a1] text-gray-100 text-sm block w-full p-2.5"
              />
            </div>
            <div className="mb-6 roboto-condensed-font">
              <label
                htmlFor="message"
                className="text-white block mb-2 text-sm font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Message..."
                required
                maxLength={3000}
                className="bg-[#3b3b3b]  rounded-xl border border-neutral-400 placeholder-[#6e88a1] text-gray-100 text-sm block w-full p-2.5"
              />
            </div>
            {errorMessage ? (
              <p className="text-red-400 text-sm mb-4" role="alert">
                {errorMessage}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-sky-500 hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-60 roboto-condensed-font rounded-full text-[#fdfbea] font-semibold py-2 px-5 w-full"
            >
              {isSubmitting ? "Sending..." : "Send Message!"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
