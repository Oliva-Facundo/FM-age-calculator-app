import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [timePast, setTimePast] = useState({
    years: "",
    months: "",
    days: "",
  });

  const [errors, setErrors] = useState({
    day: "",
    month: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateFields = () => {
    const { day, month, year } = form;
    const errors = {};

    if (!day || !month || !year) {
      errors.day = !day ? "This field is required." : "";
      errors.month = !month ? "This field is required." : "";
      errors.year = !year ? "This field is required." : "";
    }

    const parsedDay = parseInt(day, 10);
    const passedMonth = parseInt(month, 10) - 1;

    if (
      parsedDay < 1 ||
      parsedDay > daysInMonth(passedMonth, year) ||
      passedMonth < 0 ||
      passedMonth > 11
    ) {
      errors.day =
        parsedDay < 1 || parsedDay > daysInMonth(passedMonth, year)
          ? "Must be a valid month"
          : "";
      errors.month =
        passedMonth < 0 || passedMonth > 11 ? "Must be a valid month" : "";
      errors.year =
        !year || new Date(year, passedMonth, parsedDay) >= new Date()
          ? "Must be a valid year"
          : "";
    }

    return errors;
  };

  const newDate = (e) => {
    e.preventDefault();

    const errors = validateFields();

    if (Object.values(errors).some((error) => error !== "")) {
      setErrors(errors);
      setTimePast({ days: "", months: "", years: "" });
      return;
    }

    const { day, month, year } = form;

    const parsedDay = parseInt(day, 10);
    const parseMonth = parseInt(month, 10) - 1;

    const pastDate = new Date(year, parseMonth, parsedDay);
    const today = new Date();

    if (pastDate >= today) {
      setErrors({
        day: "",
        month: "",
        year: "Date must be in the past",
      });
      setTimePast({ days: "", months: "", years: "" });
      return;
    }
    setErrors({ day: "", month: "", year: "" });

    const differenceInTime = today - pastDate;

    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    const years = Math.floor(differenceInDays / 365);
    const months = Math.floor((differenceInDays % 365) / 30);
    const days = Math.floor((differenceInDays % 365) % 30);

    setTimePast({ years, months, days });
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  return (
    <>
      <main className="bg-white w-[50rem] max-h-[42rem] p-14 rounded-3xl rounded-ee-[12rem] max-sm:min-w-[20rem] max-sm:max-w-[24rem] max-sm:min-h-[15rem] max-sm:rounded-ee-[6rem] max-sm:px-6 max-sm:py-12">
        <form className="min-h-[40%]" onSubmit={newDate}>
          <div className="flex w-full items-center gap-10 max-sm:gap-2">
            <div className="w-[9rem] flex flex-col gap-2">
              <h2
                className={`font-medium tracking-widest uppercase ${
                  errors.day ? "text-error" : "text-smokeyGrey"
                }`}
              >
                day
              </h2>
              <input
                type="text"
                placeholder="DD"
                name="day"
                id="day"
                value={form.day}
                onChange={handleChange}
                maxLength="2"
                className={`border-ligthGrey border rounded-lg p-4 text-2xl font-bold text-offBlack w-full focus:border-morado caret-morado outline-none ${
                  errors.day ? "border-error" : ""
                }`}
              />
              <p className="h-2 text-[.7rem] text-error">{errors.day}</p>
            </div>

            <div className="w-[9rem] flex flex-col gap-2">
              <h2
                className={`font-medium tracking-widest uppercase ${
                  errors.month ? "text-error" : "text-smokeyGrey"
                }`}
              >
                month
              </h2>
              <input
                type="text"
                placeholder="MM"
                name="month"
                id="month"
                value={form.month}
                onChange={handleChange}
                maxLength="2"
                className={`border-ligthGrey border rounded-lg p-4 text-2xl font-bold text-offBlack w-full focus:border-morado caret-morado outline-none ${
                  errors.month ? "border-error" : ""
                }`}
              />
              <p className="h-2 text-[.7rem] text-error">{errors.month}</p>
            </div>

            <div className="w-[9rem] flex flex-col gap-2">
              <h2
                className={`font-medium tracking-widest uppercase ${
                  errors.year ? "text-error" : "text-smokeyGrey"
                }`}
              >
                year
              </h2>
              <input
                type="text"
                placeholder="YYYY"
                name="year"
                id="year"
                value={form.year}
                onChange={handleChange}
                maxLength="4"
                className={`border-ligthGrey border rounded-lg p-4 text-2xl font-bold text-offBlack w-full focus:border-morado caret-morado outline-none ${
                  errors.year ? "border-error" : ""
                }`}
              />
              <p className="h-2 text-[.7rem] text-error">{errors.year}</p>
            </div>
          </div>
          <div className="flex justify-end items-center max-sm:justify-center my-6">
            <div className="w-[89%] h-[1px] bg-lightGrey max-lg:w-[80%] max-sm:w-[37%]"></div>
            <button
              type="submit"
              className="bg-morado h-20 w-20 rounded-full flex items-center justify-center hover:bg-offBlack outline-none "
            >
              <img src="/src/assets/icon-arrow.svg" alt="->" />
            </button>
            <div className="max-sm:w-[37%] h-[1px] bg-lightGrey "></div>
          </div>
        </form>

        <div className="min-h-[60%] w-full">
          <h1 className=" text-offBlack text-[5rem] font-black max-sm:text-[3.5rem]">
            {" "}
            <span className=" text-morado">
              {" "}
              {timePast.years === "" ? "--" : timePast.years}{" "}
            </span>{" "}
            years{" "}
          </h1>
          <h1 className=" text-offBlack text-[5rem] font-black max-sm:text-[3.5rem]">
            {" "}
            <span className=" text-morado">
              {" "}
              {timePast.months === "" ? "--" : timePast.months}{" "}
            </span>{" "}
            months{" "}
          </h1>
          <h1 className=" text-offBlack text-[5rem] font-black max-sm:text-[3.5rem]">
            {" "}
            <span className=" text-morado">
              {" "}
              {timePast.days === "" ? "--" : timePast.days}{" "}
            </span>{" "}
            days{" "}
          </h1>
        </div>
      </main>
      <footer className=" text-center text-xs fixed bottom-0">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          rel="noreferrer"
          target="_blank"
          className=" text-morado "
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          href="https://www.linkedin.com/in/facundo-oliva-0999bb252/"
          className=" text-morado "
        >
          Facundo
        </a>
        .
      </footer>
    </>
  );
}

export default App;
