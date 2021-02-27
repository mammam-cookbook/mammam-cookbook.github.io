import CateCard from 'components/CateCard'
import CourseCard from 'components/CourseCard'
import 'pages/Home/home.css'
import React from 'react'
import Slider from 'react-slick'

function SwipeList(props) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div>
      {props.type === 'courses' ? (
        <Slider {...settings}>
          {props.list?.length > 0 ? (
            props.list.map(item => {
              return (
                <CourseCard
                  id={item.id}
                  img={item.thumbnail}
                  title={item.name}
                  teacher={item.teacherName}
                  cate={item.category}
                  price={item.price}
                  rating={item.rating}
                  total={item.ratingCount}
                  item={item}
                />
              )
            })
          ) : (
            <div />
          )}
        </Slider>
      ) : (
        <Slider {...settings}>
          {props.list?.length > 0 ? (
            props.list.map(item => {
              return (
                <CateCard
                  img={item.img}
                  title={item.name}
                  id={item.categoryId}
                />
              )
            })
          ) : (
            <div />
          )}
        </Slider>
      )}
    </div>
  )
}

export default SwipeList
