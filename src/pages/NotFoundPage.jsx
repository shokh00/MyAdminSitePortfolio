import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className='notFound'>
      <div class='error'>
        <h1 class='code'>404</h1>
        <h2 class='desc'>Ops... There's something wrong.</h2>
      </div>
      <Button className='not-found-btn' type='primary'>
        <Link to={"/dashboard"}>
          Go to Home
        </Link>
      </Button>
    </div>
  )
}