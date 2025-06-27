import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
} from "lucide-react"

export const statuses = [
  {
    id: 1,
    name: "Backlog",
    icon: HelpCircle,
  },
  {
    id: 2,
    name: "Todo",
    icon: Circle,
  },
  {
    id: 3,
    name: "In Progress",
    icon: Timer,
  },
  {
    id: 4,
    name: "Done",
    icon: CheckCircle,
  },
  {
    id: 5,
    name: "Canceled",
    icon: CircleOff,
  },
]

export const priorities = [
  {
    id: 1,
    name: "Low",
    icon: ArrowDown,
  },
  {
    id: 2,
    name: "Medium",
    icon: ArrowRight,
  },
  {
    id: 3,
    name: "High",
    icon: ArrowUp,
  },
]