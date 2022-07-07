import React from "react"
import classNames from 'classnames';

type MyButtonProps = {
  me?: number
  ms?: number
  mb?: number
  isLoading?: boolean
  text: string
  onClick: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
const MyButton = ({ isLoading, text, onClick, ms, me, mb }: MyButtonProps) => {


  return (
    <button
      className={classNames('btn btn-outline-secondary flex-grow-1 mb-md-0', {
        [`ms-md-${ms}`]: ms,
        [`me-${me}`]: me,
        [`mb-sm-${mb}`]: mb,
      })}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading &&
        <span
          className="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"></span>
      }
      {isLoading ? 'Loading...' : text}
    </button>
  )
}

export { MyButton }
