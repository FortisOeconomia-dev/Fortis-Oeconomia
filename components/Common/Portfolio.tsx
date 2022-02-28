import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
  items: 1,
  nav: true,
  loop: true,
  margin: 30,
  dots: true,
  autoplay: true,
  autoplayHoverPause: true,
  navText: [
    "<i class='bx bx-left-arrow-alt'></i>",
    "<i class='bx bx-right-arrow-alt'></i>",
  ],
};

interface PortfolioProps {
  bgColor?: string;
  contentColor?: string;
  shape?: boolean;
}

const Portfolio: React.FC<PortfolioProps> = ({
  bgColor,
  contentColor = '',
  shape,
}) => {
  const [display, setDisplay] = useState(false);
  const [isMounted, setisMounted] = useState(false);
  const [showShape, setshowShape] = useState(shape);

  useEffect(() => {
    setisMounted(true);
    setDisplay(true);
    setisMounted(false);
  }, []);

  return (
    <>
      <div className={`portfolio-area ${bgColor}`}>
        <div className='container'>
          <div className={`single-portfolio-item ${contentColor}`}>
            <div className='row align-items-center m-0'>
              <div className='col-xl-5 col-lg-6 col-md-12 p-0'>
                <div className='content-slides'>
                  {display ? (
                    <OwlCarousel {...options}>
                      <div className='content'>
                        <h3>Manage Your Portfolio</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco.
                        </p>
                      </div>
                      <div className='content'>
                        <h3>Poerfull API</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco.
                        </p>
                      </div>
                      <div className='content'>
                        <h3>Vault Protection</h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco.
                        </p>
                      </div>
                    </OwlCarousel>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className='col-xl-7 col-lg-6 col-md-12 p-0'>
                <div className='image text-center'>
                  <img src='/images/portfolio/portfolio-img1.png' alt='image' />
                </div>
              </div>
            </div>
          </div>
        </div>
        {shape && (
          <div className='shape11'>
            <img src='/images/shape/shape11.png' alt='image' />
          </div>
        )}
      </div>
    </>
  );
};

export default Portfolio;
