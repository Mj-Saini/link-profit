/* eslint-disable react/no-unescaped-entities */
'use client'

import Image from "next/image";
import Header from "./components/Header";
import { DM_Sans } from "next/font/google";
import { ShareIcon, WishListIcon } from "./components/Icons";
import { dataSafetyItems, features, reviewTags, screenshots, tags, updates } from "./components/Helper";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import AppDetails from "./components/AppDetails";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebaseConfig";
import appLogo from '../../public/logo.jpeg'


const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // pick what you need
  display: "swap",
});


export default function Home() {


  const [checkedAuth, setCheckedAuth] = useState(false);
  const router = useRouter();

  const [reviews] = useState([
    {
      id: 1,
      name: "Scott Newby",
      avatar: "https://play.googlelucky.com/store/apps/com.slots.casino.vegas.free.game/thefiles/unnamed(5).webp",
      date: "December 2, 2023",
      rating: 5,
      text: "It's very good. The new version is quite different from the first one. It's not only beautiful but also rich in functions. Recommend!",
      helpful: 16,
    },
    {
      id: 2,
      name: "Ryan Hunter",
      avatar: "https://play.googlelucky.com/store/apps/com.slots.casino.vegas.free.game/thefiles/unnamed(6).webp",
      date: "December 3, 2023",
      rating: 4,
      text: "We set a high standard for ourselves, and we’re so sorry to hear this was not met in your interaction with us.",
      helpful: 8,
    },
  ]);

  const totalRating = 5.0;
  const totalReviews = 7_500_000; // 7.5L
  const ratingDistribution = [
    { stars: 5, count: 418082 },
    { stars: 4, count: 91765 },
    { stars: 3, count: 23598 },
    { stars: 2, count: 4159 },
    { stars: 1, count: 7371 },
  ];

  const maxCount = Math.max(...ratingDistribution.map((r) => r.count));


  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`w-4 h-4 ${i <= rating ? "text-[#01875f] fill-current" : "text-gray-300 fill-current"
            }`}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    return stars;
  };




  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/registration"); // redirect only if not logged in
      } else {
        setCheckedAuth(true); // only render page when auth confirmed
      }
    });
    return () => unsubscribe();
  }, [router]);

  // 🩹 SSR safe fix: don't render anything until auth checked
  if (!checkedAuth) return null;

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/registration");
  };
  return (
    <>
      <Header />


      <div className="mx-auto px-4 bg-white md:px-20">
        {/* Game Header */}
        <div className="flex items-start space-x-4">


          <div className="flex-1 mt-5 md:mt-24">
            <div className="flex justify-between">
              <div className="flex items-center space-x-4">
                <Image width={64} height={64} className="flex md:hidden" src={appLogo} alt="" />
                <div>
                  <h1 className={`text-2xl md:text-4xl lg:text-[56px] font-normal text-black ${dmSans.className}`}>Link Profit</h1>
                  <div className="flex flex-col space-x-2 md:mt-3 text-sm text-gray-600">
                    <span className="text-[#105943] capitalize">earning Hub</span>
                    <span className="text-xs text-[#9AA0A6]">In-app purchases</span>
                  </div>
                </div>
              </div>
              <Image width={180} height={180} className="md:flex hidden" src={appLogo} alt="" />
</div>
          </div>
        </div>

        {/* Game Stats */}
        <div className="flex justify-between mt-3 md:mt-6 bg-gray-50 py-4 md:p-4 rounded-xl max-w-[400px]">
          <div>
            
          </div>  <div className="text-center flex-1">
            <div className="text-black font-normal text-xs flex items-center justify-center">
              4.8 <span className="ml-1 text-yellow-400">★</span>
            </div>
            <div className="text-gray-500 text-xs mt-1">8.9L reviews</div>
          </div>

          <div className="text-center flex-1">
            <div className="text-black font-normal text-xs">1Cr+</div>
            <div className="text-gray-500 text-xs mt-1">Downloads</div>
          </div>

          <div className="text-center flex-1 justify-center">
            <Image
              src="https://play.googlelucky.com/store/apps/com.slots.casino.vegas.free.game/thefiles/unnamed.webp"
              alt="Content Rating"
              width={32}
              height={32}
              className="mx-auto w-4 h-4 object-contain"
            />
            <div className="text-gray-500 text-xs mt-1">Teen</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap md:space-x-4 mt-6 max-w-[600px] ">
          <button className="flex justify-center w-full text-sm md:w-[200px] text-center bg-[#105943] text-white py-1.5 rounded-md font-normal">
            Install
          </button>
          <div className="flex flex-wrap space-x-4 justify-center md:justify-start max-md:mx-auto mt-3 md:mt-0">

            <button className="flex justify-center gap-2 cursor-pointer text-center text-[#105943] py-1.5 rounded-xl font-normal transition">
              <ShareIcon />
              share
            </button>
            <button className="flex justify-center gap-2 text-center text-[#a2aab5] py-1.5 font-normal">
              <WishListIcon />
              Add to wishlist
            </button>
</div>

        </div>

      </div>

      {/* slider */}
      <section className="md:px-20 py-8 bg-white -mt-1 px-4">
        <div className="flex flex-wrap pt-10">
          <div className="w-full md:w-2/3 md:pe-4">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              {screenshots.map((shot, idx) => (
                <div
                  key={idx}
                  className="relative w-[115px] md:min-w-[166px] max-w-[166px] overflow-hidden rounded-lg cursor-pointer flex-shrink-0"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={166}
                    height={290}
                    className="w-full  h-auto object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="py-5">
              {/* Header */}
              <header className="flex items-center justify-between mb-6">
                <h2 className="text-[22px] text-[#202124] font-normal ">
                  About this game
                </h2>

              </header>

              {/* Description */}
              <div className="mb-6 text-[#5F6368] leading-relaxed">
                <p className="mb-4">
                  The newest free Vegas slots game you&apos;ve never met before. Ready to
                  take the lucky journey with Super Fortune?
                </p>
                <ul className="list-none list-inside space-y-2">
                  {features.map((f, i) => (
                    <li key={i} className=" before:content-['*'] before:mr-1.5 before:text-gray-500 text-sm text-[#5F6368] pt-2">{f}</li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 md:mt-6">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full border border-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="bg-white mt-10">
                <div>

                  <h2 className="text-xl font-semibold text-gray-800">Data safety</h2>

                  <p className="text-sm text-gray-600 mb-6">
                    Safety starts with understanding how developers collect and share your
                    data. Data privacy and security practices may vary based on your use,
                    region, and age. The developer provided this information and may update
                    it over time.
                  </p>
                </div>

                {/* List */}
                <div className="space-y-4 rounded-xl border border-gray-300 p-5">
                  {dataSafetyItems.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">

                      {item.img}
                      <div>
                        <p className="text-sm text-gray-800">{item.text}</p>
                        {item.subtext && (
                          <p className="text-xs text-gray-500">{item.subtext}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="py-4">
              <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
                <h2 className="text-lg md:text-xl text-black font-medium">Ratings and Reviews</h2>
                <p className="text-sm text-gray-500">Ratings and reviews are verified</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {reviewTags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 capitalize py-1 text-sm bg-gray-100 text-gray-700 rounded-full border border-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="py-4 flex">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-3xl md:text-[56px] font-medium text-black">{totalRating.toFixed(1)}</div>
                    <div className="flex">{renderStars(Math.round(totalRating))}</div>
                    <div className="text-gray-500 text-xs">{(totalReviews / 100000).toFixed(1)}L reviews</div>
                  </div>
                </div>

                <div className="space-y-0 mt-4 w-full">
                  {ratingDistribution.map((r) => {
                    const widthPercent = (r.count / maxCount) * 100;
                    return (
                      <div key={r.stars} className="flex items-center gap-2">
                        <span className="w-4 text-sm font-medium">{r.stars}</span>
                        <span className="text-right text-sm text-gray-600">
                          {r.stars}
                        </span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-2 bg-[#01875f]"
                            style={{ width: `${widthPercent}%` }}
                            title={r.count.toLocaleString()}
                          ></div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border py-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />

                      <div className="font-medium text-[#202124]">{review.name}</div>

                    </div>

                    <div className="flex gap-3">
                      <span className="flex items-center mb-2 text-[#01875f]">
                        {renderStars(review.rating)}
                      </span>
                      <span className="text-sm text-[#5f6368]">
                        {review.date}
                      </span>
                    </div>

                    <p className="mb-2 text-[#5f6368] text-sm">{review.text}</p>

                    <div className="flex gap-2 text-sm text-[#5f6368]">
                      <span>{review.helpful} people found this helpful</span>
                      <div className="flex items-center gap-1">
                        <button className="px-3 rounded-full bg-white border border-gray-300">Yes</button>
                        <button className="px-3 rounded-full bg-white border border-gray-300">No</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div className="py-4 bg-white rounded-lg">

              <h2 className="text-[22px] font-medium text-black">What's new</h2>

              <div className="text-[#5f6368] py-5">
                <p className="mb-2">
                  The end of the year on Quick Hit Slots is going to be a BIG PARTY!
                </p>
                <ul className="list-disc list-inside space-y-1 mb-2 py-3">
                  {updates.map((update, index) => (
                    <li key={index} className="text-sm">{update}</li>
                  ))}
                </ul>
                <p className="font-normal text-[#5f6368] mt-2">DOWNLOAD & UPDATE NOW!</p>
              </div>
            </div>

          </div>
          <div className="w-full md:w-1/3 md:ps-4">
            <AppDetails />
          </div>
        </div>
      </section>

      <Footer />

    </>
  );
}
