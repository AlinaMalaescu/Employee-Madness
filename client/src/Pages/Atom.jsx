import { atom } from "jotai"
const state = {
    filter: atom(""),
    employees: atom(null),
    rearrangement: atom(null)
}

export default state