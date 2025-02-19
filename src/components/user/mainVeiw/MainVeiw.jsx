import React from 'react'

export default function MainVeiw({ title, subtitle }) {
  return (
    <>
       <div className="bg-light py-5 text-center">
      <h1 className="display-8 fw-bold text-dark">{title}</h1>
      <p className="text-secondary mt-2 mb-5">{subtitle}</p>
    </div>
    </>
  )
}
