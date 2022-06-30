import { useRouter } from 'next/router'
import Link from 'next/link'

const Header = () => {
  const { pathname } = useRouter()

  return (
    <header>
      <Link href="/">
        <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
      </Link>
      <Link href="/blog/joy-baking-soda">
        <a className={pathname === '/blog/joy-baking-soda' ? 'is-active' : ''}>BlogPage</a>
      </Link>
      <Link href="/breads/anpan">
        <a className={pathname === '/breads/anpan' ? 'is-active' : ''}>BreadPage</a>
      </Link>
      <style jsx>{`
        header {
          margin-bottom: 25px;
        }
        a {
          font-size: 14px;
          margin-right: 15px;
          text-decoration: none;
        }
        .is-active {
          text-decoration: underline;
        }
      `}</style>
    </header>
  )
}

export default Header;