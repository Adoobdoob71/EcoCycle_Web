const RECYCLING_GOAL = JSON.parse(
  localStorage.getItem("recycling_goal") || "20"
)

const DAYS_TO_LOAD = 6

export { RECYCLING_GOAL, DAYS_TO_LOAD }
