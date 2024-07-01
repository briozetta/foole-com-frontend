import React from 'react'
import Hero from '../section/Hero'
import Card from '../components/Card'
import PopularCategories from '../components/shared/PopularCategories'
import CategorySlider from '../components/helpers/CategorySlider'
import RunningAds from '../components/helpers/RunningAds'

const HomePage = () => {
  return (
    <>
     <section><Hero/></section> 
     <section><CategorySlider/></section>
     <section><PopularCategories/></section>
     <section><RunningAds /></section>
     <section><Card/></section>
    </>
  )
}

export default HomePage
