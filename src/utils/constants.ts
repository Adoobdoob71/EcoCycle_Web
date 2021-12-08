const RECYCLING_GOAL = parseInt(
  localStorage.getItem("recycling_goal") || "20",
  10
)

const DAYS_TO_LOAD = 6

export { RECYCLING_GOAL, DAYS_TO_LOAD }
