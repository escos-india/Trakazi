import { BehaviourSubCategory } from './types';

export const TEST_INFO = [
  "The reason for test end",
  "The day of the week",
  "The time of the day (Am/Pm)"
];

export const ARENA_MEASURES = [
  "Test Duration",
  "Total Distance Travelled",
  "Total Distance Travelled by Head",
  "First ROI Entered",
  "Avg. Speed",
  "Max Speed",
  "Absolute Turn Angle",
  "Number of Full Rotation",
  "Anti-clockwise Full Rotation",
  "Clockwise Full Rotation",
  "Path Efficiency"
];

export const ROI_MEASURES = [
  "No. of Entries",
  "No. Of Exits",
  "Time In ROI",
  "Was First ROI entered (Yes/NO)",
  "Distance Travelled",
  "Latency to first entry",
  "Latency to first exit",
  "Avg Speed",
  "Max Speed",
  "Longest visit to ROI",
  "Shortest Visit to ROI",
  "Average duration of visit to ROI",
  "Initial distance from ROI",
  "Absolute Turn Angle",
  "Path Efficiency"
];

export const BEHAVIOURS: BehaviourSubCategory[] = [
  { name: "Mobile", measures: ["Mobile Latency", "No. of Periods", "Mobile Time"] },
  { name: "Immobile", measures: ["Immobile Latency", "No. of Periods", "Immobile Time"] },
  { name: "Freezing", measures: ["Freezing Latency", "No. of Periods", "Freezing Time"] },
  { name: "Rearing", measures: ["Rearing time", "No. of Periods", "Rearing Time"] },
  { name: "Grooming", measures: ["Grooming time", "No. of periods", "Grooming Latency"] },
  { name: "Curled up", measures: ["Curled up time", "No. of periods", "Curled up latency"] },
  { name: "Stretch out", measures: ["Stretch out time", "No. of periods", "Stretch out latency"] },
];

export const DATA_CATEGORIZATION = [
  "Group (Show no. of groups)",
  "Animal Number",
  "Trial Type",
  "Trial (Show no. of Trials)",
  "Arena/Apparatus",
  "The reason for the test end",
  "Test Date",
  "Test day of the week",
  "Test time of the day",
  "Time-bin of the test",
  "Weight of Animal",
  "Gender of Animal",
  "Age"
];

export const REPORT_FORMAT_OPTS = [
  "Standard Deviation",
  "Standard error",
  "Show Animal no.",
  "Show Trial type/Trial no."
];

export const GRAPH_TYPES = [
  "Line",
  "Bar/column",
  "Scattered graph"
];

export const PARAMETRIC_POST_HOC = [
  "None",
  "Bonferroni Test",
  "Duncan’s Test",
  "Fisher’s LSD Test",
  "Scheffe’s Test",
  "Sidak Test",
  "Student-Neuman-Keules Test",
  "Tukey Test"
];

export const NON_PARAMETRIC_POST_HOC = [
  "None",
  "Appropriate test to data"
];