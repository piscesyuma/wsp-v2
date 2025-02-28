import React from "react"

const GridIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 21H7.675V16.325H3V19C3 19.55 3.19583 20.0208 3.5875 20.4125C3.97917 20.8042 4.45 21 5 21ZM9.675 21H14.325V16.325H9.675V21ZM16.325 21H19C19.55 21 20.0208 20.8042 20.4125 20.4125C20.8042 20.0208 21 19.55 21 19V16.325H16.325V21ZM3 14.325H7.675V9.675H3V14.325ZM9.675 14.325H14.325V9.675H9.675V14.325ZM16.325 14.325H21V9.675H16.325V14.325ZM3 7.675H7.675V3H5C4.45 3 3.97917 3.19583 3.5875 3.5875C3.19583 3.97917 3 4.45 3 5V7.675ZM9.675 7.675H14.325V3H9.675V7.675ZM16.325 7.675H21V5C21 4.45 20.8042 3.97917 20.4125 3.5875C20.0208 3.19583 19.55 3 19 3H16.325V7.675Z"
      fill="currentColor"
    />
  </svg>
)

export default GridIcon
