import React from 'react'
import Hero from '../section/Hero'
import Divider from '../components/helpers/Divider'
import Card from '../components/Card'

const HomePage = () => {
  return (
    <>
     <section><Hero/></section> 
     <section><Divider/></section>
     <section><Card/></section>
    </>
  )
}

export default HomePage
