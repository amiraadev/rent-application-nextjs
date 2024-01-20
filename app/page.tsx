import Image from 'next/image'
import Container from './components/Container'
import ClientOnly from './components/ClientOnly'

export default function Home() {
  return (
    <ClientOnly >
      <Container >
        <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5  2xl:grid-cols-6 gap-8 '>
          <div>My future listings</div>
        </div>
      </Container>
    </ClientOnly>
  )
}
