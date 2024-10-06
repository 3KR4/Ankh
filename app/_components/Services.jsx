import Image from 'next/image'

function Services() {
  return (
    <div className='services'>
    <span className='hiddens'>Services</span>
    <h2>ANKH Does it All</h2>
    <p>Your all-in-one solution for real estate success, handling every step with ease.</p>

    <div className='holder'>
      <div className='box'>
        <Image src='/image/Cold Calling.png' alt='icon' fill></Image>
        <h4>Cold Calling</h4>
        <p>Reach potential clients through direct, personalized outreach to drive engagement.</p>
      </div>
      <div className='box'>
        <Image src='/image/Lead Generation.png' alt='icon' fill></Image>
        <h4>Lead Generation</h4>
        <p>Identify and capture high-quality leads to fuel business growth and success.</p>
      </div>
      <div className='box'>
        <Image src='/image/Data Center.png' alt='icon' fill></Image>
        <h4>Data Center</h4>
        <p>Leverage data insights for informed decisions and optimized property management.</p>
      </div>
      <div className='box'>
        <Image src='/image/Acquisition and Disposition.png' alt='icon' fill></Image>
        <h4>Acquisition & Disposition</h4>
        <p>Seamlessly handle property transactions, from buying to selling, with expert precision.</p>
      </div>
    </div>
  </div>
  )
}

export default Services