import React, { useState, useEffect } from "react"

function useScan() {
  const [multiplier, setMultiplier] = useState(1)
  const [loading, setLoading] = useState(false)

  const incrementMult = setMultiplier((multiplier) => multiplier + 1)
  const decrementMult = setMultiplier((multiplier) => multiplier - 1)

  const decrementDisabled = multiplier === 0

  return {
    multiplier,
    incrementMult,
    decrementMult,
    decrementDisabled,
    loading,
  }
}

export { useScan }
