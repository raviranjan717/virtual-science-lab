import React from 'react';
import Fade from 'react-reveal/Fade';

const MobileResponsive = () => {
  return (
    <section
      className="min-h-full lg:pt-10 bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(https://i.ibb.co/QMKRNPL/features-1.png)`,
      }}
    >
      <Fade up>
        <div className="mx-auto lg:mx-24 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-24">
          {/* Small Background Image */}
          <div
            className="min-h-screen sm:min-h-full bg-cover sm:bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage: `url(https://i.ibb.co/vY6ShYW/features-overlay.png)`,
            }}
          >
            <div className="xl:px-32">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-5/12 ">
                  {/* Mobile Mockup */}
                  <div className="lg:-top-24 relative pt-8 lg:pt-0">
                    <img
                      src="https://i.ibb.co/F5zQbHq/mobile-mockup.png"
                      alt="mobile-mockup"
                      className="object-cover mx-auto lg:mx-0 w-52 lg:w-64"
                    />
                  </div>
                </div>
                {/* Contents */}
                <div className="w-full lg:w-7/12 pb-10">
                  <h1 className="mt-0 sm:mt-12 lg:mt-28 xl:mt-24 font-display pt-5 text-3xl xl:text-3xl font-semibold leading-10 xl:leading-relaxed tracking-wider text-white sm:text-brand-900 lg:text-white mx-4 xl:mx-0 text-center lg:text-left xl:w-96">
                    সম্পূর্ণ মোবাইল রেস্পন্সিভ ওয়েব এপ্লিকেশন
                  </h1>
                  <p className="font-body pt-6 font-medium text-lg text-indigo-50 sm:text-gray-800 lg:text-indigo-50 xl:text-xl text-center lg:text-left">
                    <span className="block pb-1">
                      সকল স্মার্ট ফোনের মাধ্যমে উপভোগ করুন{' '}
                    </span>
                    <span className="block pb-1">
                      {' '}
                      অনুশীলন এর সকল সিমুলেশন{' '}
                    </span>
                    <span className="block pb-1"> সর্বত্র বিনামূল্যে! </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default MobileResponsive;
