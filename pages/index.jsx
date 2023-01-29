import Head from 'next/head'
import Image from 'next/image'
import { SpinnerGap, InstagramLogo, Envelope, WhatsappLogo, TiktokLogo } from 'phosphor-react'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { Nunito } from '@next/font/google';

const nunito = Nunito({ subsets: ['latin'], weight: '900' });

export default function Home() {
  const gallery = useRef()
  const [imgsLoaded, setImgsLoaded] = useState(false)
  const [images, setImages] = useState([[]])
  const [margins, setMargins] = useState([])
  const [minTop, setMinTop] = useState(null)
  const [colJustify, setColJustify] = useState('start')
  const [loading, setLoading] = useState(true);

  useMemo(() => { axios.defaults.baseURL = 'https://api.sirv.com/v2' }, [])

  /*
  curl --request POST \
  --url https://api.sirv.com/v2/token \
  --header 'content-type: application/json' \
  --data '{"clientId":"IVoAlYDropHLYsrObMp5bAKtO9d","clientSecret":"DaBGDcqs6+ozLPGiO7LX57fUaBWUugkPNnLrvLKgsUwf9dO/GZphIAUpvI/LRIVbyrYU+3mfhXWo8cjxFTnnRQ=="}'
  */

  const setColMargin = useCallback((_, colIndex) => {
    const { current } = gallery

    if (current && current.childNodes) {
      const heights = [...current.childNodes].map(n => n.offsetHeight)
      const galleryHeight = Math.max(...heights, 0)

      if (heights.length) {
        const { top } = current.getBoundingClientRect()

        if (!minTop) {
          setMinTop(top)
        }

        const colHeight = current.childNodes[colIndex]?.offsetHeight

        const margin = galleryHeight - colHeight || 0
        const percentage = ((top - minTop) / galleryHeight) * (-1)

        const checkZeros = percentage <= 0 || top >= 0

        if (percentage * 100 > 80) {
          setColJustify('end')
          return margin
        }

        setColJustify('start')

        return checkZeros ? 0 : margin * percentage
      }
    }

    return 0;
  }, [minTop])

  const makeColumns = (contents, colN) => {
    const initialArray = Array(colN).fill([])

    let currentArray = 0

    const filteredContent = contents.filter(c => c.filename.includes('png'))

    const divideRowsNum = filteredContent.length / colN

    const columns = filteredContent.reduce((acc, curr) => {
      acc[currentArray] = [...acc[currentArray], curr]

      if (acc[currentArray]?.length >= divideRowsNum)
        currentArray++

      return acc
    }, initialArray)

    return columns
  }

  const fetchImages = async () => {
    setImgsLoaded(true);

    const body = { clientId: process.env._APP_CLIENT_ID, clientSecret: process.env._APP_CLIENT_SECRET };

    const getToken = await axios.post('/token', body);

    const { token } = getToken.data;

    const headers = {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    };

    const params = { dirname: '/pepeu' };

    const { data } = await axios.get('/files/readdir', { headers, params });
    const { contents } = data;

    const getWidth = () => Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );

    const getCols = () => getWidth() >= 1620 ? 3 : getWidth() >= 1050 ? 2 : 1;

    const columns = makeColumns(contents, getCols());

    setImages(columns);

    window.addEventListener('resize', () => {
      setMinTop(null);
      setImages(makeColumns(contents, getCols()));
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      setMargins(images.map(setColMargin));
    }

    document.addEventListener('scroll', handleScroll);

    if (!imgsLoaded) {
      fetchImages();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }

    return () => {
      document.removeEventListener('scroll', handleScroll);
    }
  })

  return (
    <div className={`${styles.container} ${nunito.className}`}>
      <Head>
        <title>Bee Splash | Portfolio</title>
        <meta name="description" content="Bee Splash's Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/bee.svg" />
      </Head>
      {loading && (
        <div className={styles.loaderContainer}>
          <SpinnerGap className={styles.loader} size={32} weight="fill" />
        </div>
      )}

      <header>
        <div className={styles.headerContent}>
          <Image width={40} height={40} src="/bee.svg" alt="Bee Logo" />
          <div className={styles.right}>
            {/* <input className={`${styles.inputContainer} ${nunito.className}`} placeholder="Search..." /> */}
            <a href="mailto:anamaria2003pc@gmail.com" rel="noreferrer" target="_blank">
              <button className={nunito.className}>Hire me!</button>
            </a>
          </div>
        </div>
      </header>
      <main>
        <section>
          <section className={styles.introContainer}>
            { /* eslint-disable-next-line @next/next/no-img-element */ }
            <img style={{ width: 442 }} src="https://opedrodev.sirv.com/bee-photo.png?canvas.color=ffffff&canvas.opacity=0&webp.fallback=png" alt="Bee Splash's photo" />
            { /* eslint-disable-next-line @next/next/no-img-element */ }
            <img className={styles.splash} src="/splash.svg" alt="splash" />
          </section>
          <section className={styles.bgGallery}>
            <div className={styles.bgFilter} />
            {
              images.length &&
              images.map((imgsArr, index) => (
                <section key={index} className={styles.bgGalleryCol}>
                  {
                    imgsArr.map(({ filename }, fileIndex) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={fileIndex} src={`https://opedrodev.sirv.com/pepeu/${filename}`} alt={filename.split('.')[0]} width="442" />
                    ))
                  }
                </section>
              ))
            }
          </section>
        </section>
        <section ref={gallery} className={styles.gallery}>
          {
            images.length &&
            images.map((imgsArr, index) => (
              <section
                key={index}
                style={{
                  marginTop: margins[index],
                  justifyContent: colJustify,
                }}
                className={styles.galleryCol}
              >
                {
                  imgsArr.map(({ filename }, fileIndex) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={fileIndex} src={`https://opedrodev.sirv.com/pepeu/${filename}`} alt={filename.split('.')[0]} width="442" />
                  ))
                }
              </section>
            ))
          }
        </section>
      </main>
      <footer className={styles.footerContainer}>
        <div>
          <h6>Check my socials :)</h6>
          <div className={styles.footerSocials}>
            <a title="E-mail" href="mailto:anamaria2003pc@gmail.com" rel="noreferrer" target="_blank">
              <Envelope size={40} color="#ffffff" weight="fill" />
            </a>
            <a title="Whatsapp" href="https://api.whatsapp.com/send/?phone=5516994629432&text&type=phone_number&app_absent=0" rel="noreferrer" target="_blank">
              <WhatsappLogo size={40} color="#ffffff" weight="fill" />
            </a>
            <a title="Tiktok" href="https://www.tiktok.com/@bee.splash" rel="noreferrer" target="_blank">
              <TiktokLogo size={40} color="#ffffff" weight="fill" />
            </a>
            <a title="Instagram" href="https://www.instagram.com/bee.splash/" rel="noreferrer" target="_blank">
              <InstagramLogo size={40} color="#ffffff" weight="fill" />
            </a>
          </div>
        </div>
        <div>Made with ❤️ by <a href="https://www.linkedin.com/in/opedroricardo/" rel="noreferrer" target="_blank">Pedro Ricardo</a></div>
      </footer>
    </div>
  )
}
