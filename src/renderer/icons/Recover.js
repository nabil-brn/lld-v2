// @flow

import React from 'react'

const path = (
  <path
    fill="currentColor"
    d="M15.65 7.985c.008 4.27-3.475 7.762-7.745 7.765a7.722 7.722 0 0 1-5.2-1.998.375.375 0 0 1-.013-.544l.53-.53a.376.376 0 0 1 .517-.012A6.228 6.228 0 0 0 7.9 14.25 6.247 6.247 0 0 0 14.15 8 6.247 6.247 0 0 0 7.9 1.75a6.23 6.23 0 0 0-4.434 1.845L5 5.108a.375.375 0 0 1-.264.642H.725a.375.375 0 0 1-.375-.375V1.42c0-.333.402-.5.638-.267l1.41 1.39A7.75 7.75 0 0 1 15.65 7.985zm-5.22 2.818l.44-.606a.375.375 0 0 0-.082-.524L8.65 8.118V3.625a.375.375 0 0 0-.375-.375h-.75a.375.375 0 0 0-.375.375v5.257l2.755 2.004a.375.375 0 0 0 .524-.083z"
  />
)

const Recover = ({ size, ...p }: { size: number }) => (
  <svg viewBox="0 0 16 16" height={size} width={size} {...p}>
    {path}
  </svg>
)

export default Recover
