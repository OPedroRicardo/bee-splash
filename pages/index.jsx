import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Chakra_Petch, JetBrains_Mono } from '@next/font/google'

import Tilty from 'react-tilty'

const menuBtn = Chakra_Petch({ subsets: ['latin'], weight: '700' });
const portfolioH1 = Chakra_Petch({ subsets: ['latin'], weight: '700' });
const buzzkillH2 = JetBrains_Mono({ subsets: ['latin'], weight: '100' })

export default function Home() {
  // const gallery = useRef()
  // const [imgsLoaded, setImgsLoaded] = useState(false)
  // const [images, setImages] = useState([[]])
  // const [margins, setMargins] = useState([])
  // const [minTop, setMinTop] = useState(null)
  // const [colJustify, setColJustify] = useState('start')
  // const [loading, setLoading] = useState(true);

  // useMemo(() => { axios.defaults.baseURL = 'https://api.sirv.com/v2' }, [])

  // /*
  // curl --request POST \
  // --url https://api.sirv.com/v2/token \
  // --header 'content-type: application/json' \
  // --data '{"clientId":"IVoAlYDropHLYsrObMp5bAKtO9d","clientSecret":"DaBGDcqs6+ozLPGiO7LX57fUaBWUugkPNnLrvLKgsUwf9dO/GZphIAUpvI/LRIVbyrYU+3mfhXWo8cjxFTnnRQ=="}'
  // */

  // const setColMargin = useCallback((_, colIndex) => {
  //   const { current } = gallery

  //   if (current && current.childNodes) {
  //     const heights = [...current.childNodes].map(n => n.offsetHeight)
  //     const galleryHeight = Math.max(...heights, 0)

  //     if (heights.length) {
  //       const { top } = current.getBoundingClientRect()

  //       if (!minTop) {
  //         setMinTop(top)
  //       }

  //       const colHeight = current.childNodes[colIndex]?.offsetHeight

  //       const margin = galleryHeight - colHeight || 0
  //       const percentage = ((top - minTop) / galleryHeight) * (-1)

  //       const checkZeros = percentage <= 0 || top >= 0

  //       if (percentage * 100 > 80) {
  //         setColJustify('end')
  //         return margin
  //       }

  //       setColJustify('start')

  //       return checkZeros ? 0 : margin * percentage
  //     }
  //   }

  //   return 0;
  // }, [minTop])

  // const makeColumns = (contents, colN) => {
  //   const initialArray = Array(colN).fill([])

  //   let currentArray = 0

  //   const filteredContent = contents.filter(c => c.filename.includes('png'))

  //   const divideRowsNum = filteredContent.length / colN

  //   const columns = filteredContent.reduce((acc, curr) => {
  //     acc[currentArray] = [...acc[currentArray], curr]

  //     if (acc[currentArray]?.length >= divideRowsNum)
  //       currentArray++

  //     return acc
  //   }, initialArray)

  //   return columns
  // }

  // const fetchImages = async () => {
  //   setImgsLoaded(true);

  //   const body = { clientId: process.env._APP_CLIENT_ID, clientSecret: process.env._APP_CLIENT_SECRET };

  //   const getToken = await axios.post('/token', body);

  //   const { token } = getToken.data;

  //   const headers = {
  //     authorization: `Bearer ${token}`,
  //     'content-type': 'application/json'
  //   };

  //   const params = { dirname: '/pepeu' };

  //   const { data } = await axios.get('/files/readdir', { headers, params });
  //   const { contents } = data;

  //   const getWidth = () => Math.max(
  //     document.body.scrollWidth,
  //     document.documentElement.scrollWidth,
  //     document.body.offsetWidth,
  //     document.documentElement.offsetWidth,
  //     document.documentElement.clientWidth
  //   );

  //   const getCols = () => getWidth() >= 1620 ? 3 : getWidth() >= 1050 ? 2 : 1;

  //   const columns = makeColumns(contents, getCols());

  //   setImages(columns);

  //   window.addEventListener('resize', () => {
  //     setMinTop(null);
  //     setImages(makeColumns(contents, getCols()));
  //   })
  // }

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setMargins(images.map(setColMargin));
  //   }

  //   document.addEventListener('scroll', handleScroll);

  //   if (!imgsLoaded) {
  //     fetchImages();
  //     setLoading(true);
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1500);
  //   }

  //   return () => {
  //     document.removeEventListener('scroll', handleScroll);
  //   }
  // })

  const social = [
    { src: 'instagram', href: 'https://www.instagram.com/b_uzzkill' },
    { src: 'tiktok', href: 'https://www.tiktok.com/@b_uzzkill' },
    { src: 'gmail', href: '' },
    { src: 'twitch', href: '' }
  ]

  return (
    <div>
      <Head>
        <title>Bee Splash | Portfolio</title>
        <meta name="description" content="Bee Splash's Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/bee.svg" />
      </Head>
      <div>
        <header className={styles.mainHeader}>
          <Image className={styles.menuIcon} src="/menuBtn.svg" alt="logo bee splash" width={81} height={98.75} />
          <div className={styles.commissionWrapper + ' ' + menuBtn.className}>
            <div className={styles.commissionTxt}>Commission!</div>
            <Image className={styles.commissionBtn} src="/commissionBtn.svg" width={208} height={74.5} />
        </div>
        </header>
        <div className={styles.mainContainer}>
          <Tilty speed={10} scale={1.1} perspective={2000}>
            <div className={styles.mainImg}>
              {['ff', 'n'].map((n, i) => (<Image alt="bee slash character" key={i} src={`/beeO${n}.png`} width={331} height={338} />))}
            </div>
          </Tilty>
          <div className={styles.mainTitle}>
            <div className={styles.h1Wrapper}>
              <h1 className={portfolioH1.className}>PORTFOLIO</h1>
            </div>
            <h2 className={buzzkillH2.className}>b_uzzkill</h2>
            <div className={styles.socials}>
              {social.map(({ href, src }, i) => (
                <a key={i} aria-label={src} href={href} target="_blank" rel="noreferrer">
                  <Image
                    key={i}
                    alt={src}
                    src={`/${src}.svg`}
                    width={48}
                    height={48}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
