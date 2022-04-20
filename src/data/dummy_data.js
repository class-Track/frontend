export const list_order = ["course_list", "year_list"];

export const lists = {
  // available courses
  course_list: {
    id: "course_list",
    name: "Course List",
    courses: [
      { id: "course_1", name: "Course 1", code: "CURS 3001" },
      { id: "course_2", name: "Course 2", code: "CURS 3002" },
      { id: "course_3", name: "Course 3", code: "CURS 3003" },
      { id: "course_4", name: "Course 4", code: "CURS 3004" },
      { id: "course_53", name: "Course 53", code: "CURS 3053" },
      { id: "course_54", name: "Course 54", code: "CURS 3054" },
      { id: "course_55", name: "Course 55", code: "CURS 3055" },
      { id: "course_56", name: "Course 56", code: "CURS 3056" },
      { id: "course_57", name: "Course 57", code: "CURS 3057" },
      { id: "course_58", name: "Course 58", code: "CURS 3058" },
      { id: "course_59", name: "Course 59", code: "CURS 3059" },
      { id: "course_60", name: "Course 60", code: "CURS 3060" },
    ],
  },
  //   available years
  year_list: {
    id: "year_list",
    name: "Year List",
    year_ids: [2020, 2021, 2022],
  },
  //   years
  2020: {
    id: "year_2020",
    name: "Year 2020",
    semester_ids: [
      "2020_fall",
      "2020_summer",
      "2020_ext_summer",
      "2020_spring",
    ],
  },
  2021: {
    id: "year_2021",
    name: "Year 2021",
    semester_ids: [
      "2021_fall",
      "2021_summer",
      "2021_ext_summer",
      "2021_spring",
    ],
  },
  2022: {
    id: "year_2022",
    name: "Year 2022",
    semester_ids: [
      "2022_fall",
      "2022_summer",
      "2022_ext_summer",
      "2022_spring",
    ],
  },
  //   semesters
  "2020_fall": {
    id: "2020_fall",
    name: "Fall",
    year: 2020,
    courses: [
      { id: "course_5", name: "Course 5", code: "CURS 3005" },
      { id: "course_6", name: "Course 6", code: "CURS 3006" },
      { id: "course_7", name: "Course 7", code: "CURS 3007" },
      { id: "course_8", name: "Course 8", code: "CURS 3008" },
    ],
  },
  "2020_summer": {
    id: "2020_summer",
    name: "Summer",
    year: 2020,
    courses: [
      { id: "course_9", name: "Course 9", code: "CURS 3009" },
      { id: "course_10", name: "Course 10", code: "CURS 3010" },
      { id: "course_11", name: "Course 11", code: "CURS 3011" },
      { id: "course_12", name: "Course 12", code: "CURS 3012" },
    ],
  },
  "2020_ext_summer": {
    id: "2020_ext_summer",
    name: "Extended Summer",
    year: 2020,
    courses: [
      { id: "course_13", name: "Course 13", code: "CURS 3013" },
      { id: "course_14", name: "Course 14", code: "CURS 3014" },
      { id: "course_15", name: "Course 15", code: "CURS 3015" },
      { id: "course_16", name: "Course 16", code: "CURS 3016" },
    ],
  },
  "2020_spring": {
    id: "2020_spring",
    name: "Spring",
    year: 2020,
    courses: [
      { id: "course_17", name: "Course 17", code: "CURS 3017" },
      { id: "course_18", name: "Course 18", code: "CURS 3018" },
      { id: "course_19", name: "Course 19", code: "CURS 3019" },
      { id: "course_20", name: "Course 20", code: "CURS 3020" },
    ],
  },
  "2021_fall": {
    id: "2021_fall",
    name: "Fall",
    year: 2021,
    courses: [
      { id: "course_21", name: "Course 21", code: "CURS 3021" },
      { id: "course_22", name: "Course 22", code: "CURS 3022" },
      { id: "course_23", name: "Course 23", code: "CURS 3023" },
      { id: "course_24", name: "Course 24", code: "CURS 3024" },
    ],
  },
  "2021_summer": {
    id: "2021_summer",
    name: "Summer",
    year: 2021,
    courses: [
      { id: "course_25", name: "Course 25", code: "CURS 3025" },
      { id: "course_26", name: "Course 26", code: "CURS 3026" },
      { id: "course_27", name: "Course 27", code: "CURS 3027" },
      { id: "course_28", name: "Course 28", code: "CURS 3028" },
    ],
  },
  "2021_ext_summer": {
    id: "2021_ext_summer",
    name: "Extended Summer",
    year: 2021,
    courses: [
      { id: "course_29", name: "Course 29", code: "CURS 3029" },
      { id: "course_30", name: "Course 30", code: "CURS 3030" },
      { id: "course_31", name: "Course 31", code: "CURS 3031" },
      { id: "course_32", name: "Course 32", code: "CURS 3032" },
    ],
  },
  "2021_spring": {
    id: "2021_spring",
    name: "Spring",
    year: 2021,
    courses: [
      { id: "course_33", name: "Course 33", code: "CURS 3033" },
      { id: "course_34", name: "Course 34", code: "CURS 3034" },
      { id: "course_35", name: "Course 35", code: "CURS 3035" },
      { id: "course_36", name: "Course 36", code: "CURS 3036" },
    ],
  },
  "2022_fall": {
    id: "2022_fall",
    name: "Fall",
    year: 2022,
    courses: [
      { id: "course_37", name: "Course 37", code: "CURS 3037" },
      { id: "course_38", name: "Course 38", code: "CURS 3038" },
      { id: "course_39", name: "Course 39", code: "CURS 3039" },
      { id: "course_40", name: "Course 40", code: "CURS 3040" },
    ],
  },
  "2022_summer": {
    id: "2022_summer",
    name: "Summer",
    year: 2022,
    courses: [
      { id: "course_41", name: "Course 41", code: "CURS 3041" },
      { id: "course_42", name: "Course 42", code: "CURS 3042" },
      { id: "course_43", name: "Course 43", code: "CURS 3043" },
      { id: "course_44", name: "Course 44", code: "CURS 3044" },
    ],
  },
  "2022_ext_summer": {
    id: "2022_ext_summer",
    name: "Extended Summer",
    year: 2022,
    courses: [
      { id: "course_45", name: "Course 45", code: "CURS 3045" },
      { id: "course_46", name: "Course 46", code: "CURS 3046" },
      { id: "course_47", name: "Course 47", code: "CURS 3047" },
      { id: "course_48", name: "Course 48", code: "CURS 3048" },
    ],
  },
  "2022_spring": {
    id: "2022_spring",
    name: "Spring",
    year: 2022,
    courses: [
      { id: "course_49", name: "Course 49", code: "CURS 3049" },
      { id: "course_50", name: "Course 50", code: "CURS 3050" },
      { id: "course_51", name: "Course 51", code: "CURS 3051" },
      { id: "course_52", name: "Course 52", code: "CURS 3052" },
    ],
  },
};

export const courses = {};
