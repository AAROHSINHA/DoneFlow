"use client"

import { useState } from "react"
import { ChevronDownIcon, ChevronRightIcon } from "./icons.tsx";
import NavigationDashBoards from "./components/NavigationDashBoards.tsx";
import NavigationTags from "./components/NavigationTags.tsx";
import NavigationAnalytics from "./components/NavigationAnalytics.tsx";

interface prop {
  updateTags: boolean
}

function NavigationSection({updateTags}: prop) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (item: string) => {
    setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }



  return (
    <div className="flex-1 py-4">
      <nav className="space-y-1 px-4">
        {/* Dashboard */}
        <NavigationDashBoards />

        {/* Tags */}
        <NavigationTags updateTags={updateTags} />

        {/* Analytics */}
        <NavigationAnalytics />
      </nav>
    </div>
  )
}

export default NavigationSection;
